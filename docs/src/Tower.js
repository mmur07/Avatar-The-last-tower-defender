import Elemental from "./Elemental.js";

export default class Tower extends Elemental{

    constructor(scene, element, xPos, yPos, range, cdShoots){
        super(scene,'towerIconSprite', element, xPos, yPos);
        this._cdShoots = cdShoots;
        //this._spriteName = spriteName;
        //this.setOrigin(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.body.setCircle(range, 32 - range, 32 - range);
        if(this.body.isCircular) console.log("CIR CU LO");
        //zthis.body.setSize( [width] [height] [center])
        this.body.updateCenter()
        // this.aggroZone = new Phaser.GameObjects.Zone(scene, xPos, yPos);
        // this.aggroZone.setSize(range * 5, range * 5);
        // this.scene.physics.add.existing(this.aggroZone, true);

        this.scene.add.existing(this);
        //this.scene.debug.body(this.aggroZone);
    }

    changeColor() {
        super.element = (super.element + 1) % 3;
        console.log(super.element);
    }

    /*preUpdate(){
        if(this.scene.physics.overlap(this.scene.))
        
    }*/
}