import Elemental from "./Elemental.js";

export default class Enemy extends Elemental{
    constructor(scene,spritename,element,xPos,yPos,hp,speed){
        super(scene,spritename,element,xPos,yPos)
        this._speed = speed;
        this._hp = hp;
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.scene.add.existing(this); 
        this.xDir = 1;
        this.yDir = 0;
        this.setScale(0.5);
    }
    get hp(){
        return this._hp;
    }
}
Enemy.prototype.ReceiveDMG = function (dmg,dmgType) {
    this._hp = this._hp - (this.dmgMultiplier(dmgType)*dmg);
    if(this._hp <= 0 ){
        this.die();
    }
    console.log(this._hp);
}
Enemy.prototype.update = function () {
    this.body.setVelocityX(this.xDir);
}
Enemy.prototype.spawn = function (xPos,yPos) {
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(xPos,yPos);
}
Enemy.prototype.die = function(){
    this.scene.ActiveEnemies.killAndHide(this);
    this.scene.EnemyPool.add(this);
    console.log("MUERO, quedan " + this.scene.ActiveEnemies.getLength()+ "enemigos");
}
