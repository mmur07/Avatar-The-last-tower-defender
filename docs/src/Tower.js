import Elemental from "./Elemental.js";

export default class Tower extends Elemental{

    constructor(scene, element, xPos, yPos, range, cdShoots){
        super(scene,'towerIconSprite', element, xPos, yPos);
        this._cdShoots = cdShoots;
        this.lockedEnemy = null;
        //this._spriteName = spriteName;
        //this.setOrigin(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.body.setCircle(range, 32 - range, 32 - range);
        this.scene.physics.add.overlap(this, this.scene.enemies, this.onCollision);
    }

    changeColor() {
        super.element = (super.element + 1) % 3;
        console.log(super.element);
    }

    onCollision(obj1, obj2){
        if (this.lockedEnemy == null) this.lockedEnemy = obj2;
        //console.log("Se besaron");
    }

    preUpdate(){
        if(!this.scene.physics.collide(this, this.lockedEnemy)) this.lockedEnemy = null;
    }
}