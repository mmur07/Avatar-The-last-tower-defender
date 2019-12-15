import Enemy from "./Enemy.js"

export default class ShieldEnemy extends Enemy {
    constructor(scene, spritename, element, xPos, yPos, hp, speed,route, id, shields) {
        super(scene, spritename, element, xPos, yPos, hp, speed,route, id)
        //this.setScale(0.1);
        this._shieldsLeft = shields;
        this.anims.stop();
        this.anims.play('shield_walk_'+this._elem);
    }
    ReceiveDMG(dmg, dmgType) {
        if (this._shieldsLeft <= 0) {
            this._hp = this._hp - (this.dmgMultiplier(dmgType) * dmg);
            if (this._hp <= 0) {
                this.die();
            }
            
        }
        else {
            this._shieldsLeft -= 1;
            if (this._shieldsLeft >= 0) {
                //cambiamos el sprite
            }

        }
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
    }
}