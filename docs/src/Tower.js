import Elemental from "./Elemental.js";

export default class Tower extends Elemental{

    constructor(scene, element, xPos, yPos, range, cdShoots){
        super(scene, element, xPos, yPos);
        this._cdShoots = cdShoots;
        //this._spriteName = spriteName;
        this.aggroZone = new Phaser.GameObjects.Zone(scene, xPos, yPos);
        this.aggroZone.setCircleDropZone(range);
        this.scene.physics.add.existing(this.aggroZone, true);
        
        this.scene.add.existing(this);
    }

    changeColor() {
        super.element = (super.element + 1) % 3;
        console.log(super.element);
    }

    preUpdate(){
        if(this.scene.physics.overlap(this.scene.))
        
    }
}