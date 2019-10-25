import Elemental from "./Elemental.js";

export default class Enemy extends Elemental{
    constructor(scene,spritename,element,xPos,yPos,hp,speed){
        super(scene,spritename,element,xPos,yPos)
        this._speed = speed;
        this._hp = hp;
        this.scene.add.existing(this);
        this.setScale(0.5);
    }
    get hp(){
        return this._hp;
    }
}
Enemy.prototype.ReceiveDMG = function (dmg,dmgType) {
    this._hp = this._hp - (this.dmgMultiplier(dmgType)*dmg);
    return(this._hp > 0);
}
Enemy.prototype.die = function(){
    this.scene.kill(this);
}