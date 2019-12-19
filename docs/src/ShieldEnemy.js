import Enemy from "./Enemy.js"

export default class ShieldEnemy extends Enemy {
    constructor(scene, spritename, element, xPos, yPos, hp, speed,route, id, shields, deathSound) {
        super(scene, spritename, element, xPos, yPos, hp, speed,route, id, deathSound)
        //this.setScale(0.1);
        this._shieldsLeft = shields;
        this.anims.stop();
        this.anims.play('shield_walk_'+this._elem);
    }
    ReceiveDMG(dmg, dmgType) {
        let modifier = this.dmgMultiplier(dmgType);
        //si somos debiles en cuanto a a elementos se refiere, no podremos quitarle el escudo
        if (modifier >= 1 && this._shieldsLeft <= 0) {
            this._hp = this._hp - (modifier * dmg);
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