import Tower from "./Tower.js"

export default class TowerIcon extends Phaser.GameObjects.Image {

    constructor(scene, spritename, xPos, yPos) {
        super(scene, xPos, yPos, spritename)
        this.originX = xPos;
        this.originY = yPos;
        this.inputEnabled = true;
        this._canAdd = false;

        this.container = this.scene.add.container(this.originX, this.originY); //Crea el container. Es la hitbox para la acción
        this.container.setSize(50, 50); //Importante definir el tamaño del container antes del setInteractive()
        this.container.setInteractive();
        this.scene.add.existing(this); //Añade el icono a la escena
        this.container.on('pointerdown',this.addTower,this); //Si el jugador hace click en el container, llama a addTower
    }


    //Seleccionamos el objeto a mover y activamos los nuevos listeners
    addTower(pointer, target) {
this._canAdd = true;
        this.dragObj = this.scene.add.image(50, 50, 'towerIconSprite'); //El objeto que arrastramos es un sprite
        //Activamos listeners para detectar la posicion del raton y cuando lo soltamos
        this.scene.input.on('pointermove', this.Drag, this); 
        this.scene.input.on('pointerup', this.stopDrag, this);

    }
    //arrastra el icono
    Drag(pointer) {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }

    stopDrag(pointer) {
        if (this._canAdd) {//si la posición es válida
            let newTower = new Tower(this.scene, 0, this.dragObj.x, this.dragObj.y, 50, 5);
            this.scene.ActiveTowers.add(newTower);
            this._canAdd = false;
        }
        //volvemos al estado inicial
        this.container.on('pointerdown',this.addTower,this);
        this.scene.input.off('pointermove', this.Drag, this);
        this.scene.input.off('pointerup', this.stopDrag, this);
        this.dragObj.destroy();
        
    }
}