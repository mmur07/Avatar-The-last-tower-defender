import Tower from "./Tower.js"

export default class TowerIcon extends Phaser.GameObjects.Image{

    constructor(scene, spritename,xPos,yPos){
        super(scene,xPos,yPos,spritename)
        this.originX = xPos;
        this.originY = yPos;
        this.scene.add.existing(this);
        this.inputEnabled = true;
        this.setInteractive();

        this.scene.input.on('pointerdown',this.addTower,this);
    }

    //Seleccionamos el objeto a mover y activamos los nuevos listeners
    addTower(pointer,target){
        this.scene.input.off('pointerdown',this.addTower,this);
        this.dragObj = this;
        this.scene.input.on('pointermove',this.Drag,this);
        this.scene.input.on('pointerup',this.stopDrag,this);
    }
    Drag(pointer){
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }
    stopDrag(pointer){
        if(true){//si la posición es válida
        let newTower = new Tower(this.scene,0,this.dragObj.x,this.dragObj.y,10,5);
        this.scene.ActiveTowers.add(newTower);
        }
        
        //Devolvemos el icono a su estado basico
        this.scene.input.on('pointerdown',this.addTower,this);
        this.scene.input.off('pointermove',this.Drag,this);
        this.scene.input.off('pointerup',this.stopDrag,this);
        this.x = this.originX; this.y = this.originY;
    }
}