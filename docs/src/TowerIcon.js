import Tower from "./Tower.js"

export default class TowerIcon extends Phaser.GameObjects.Image {

    constructor(scene, spritename, xPos, yPos) {
        super(scene, xPos, yPos, spritename)
        this.originX = xPos;
        this.originY = yPos;
        this.inputEnabled = true;
        this._canAdd = false;

        this.container = this.scene.add.container(this.originX, this.originY); //Crea el container. Es la hitbox para la acción
        this.container.setSize(64, 64); //Importante definir el tamaño del container antes del setInteractive()
        this.container.setInteractive();
        this.scene.add.existing(this); //Añade el icono a la escena
        this.container.on('pointerdown',this.addTower,this); //Si el jugador hace click en el container, llama a addTower

        this.sample_Tile = this.scene.towers.getTileAt(30, 30);
    }


    //Seleccionamos el objeto a mover y activamos los nuevos listeners
    addTower(pointer, target) {
        this._canAdd = true;
        this.dragObj = this.scene.add.image(64, 64, 'towerIconSprite'); //El objeto que arrastramos es un sprite
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
        let tile_canAdd = this.scene.can_place_towers.getTileAtWorldXY(pointer.x, pointer.y);
        let tile_towers = this.scene.towers.getTileAtWorldXY(pointer.x, pointer.y);
        if (tile_canAdd != null && tile_towers == null) {//si la posición es válida
            this.scene.towers.putTileAtWorldXY(this.sample_Tile, pointer.x, pointer.y);
            new Tower(this.scene, 0, tile_canAdd.getCenterX(), tile_canAdd.getCenterY(), 50, 1);
        }
        //volvemos al estado inicial
        this.scene.input.off('pointermove', this.Drag, this);
        this.scene.input.off('pointerup', this.stopDrag, this);
        this.dragObj.destroy();
        
    }
}