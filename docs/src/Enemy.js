import Elemental from "./Elemental.js";

export default class Enemy extends Elemental {
    constructor(scene, spritename, element, xPos, yPos, hp, speed) {
        super(scene, spritename, element, xPos, yPos)
        this._speed = speed;
        this._hp = hp;
        this.scene.add.existing(this);
        this.setScale(0.5);
    }
    get hp() {
        return this._hp;
    }

    update() {

    }

    ReceiveDMG(dmg, dmgType) {
        this._hp = this._hp - (this.dmgMultiplier(dmgType) * dmg);
        if (this._hp <= 0) {
            this.die();
        }
    }

    spawn(xPos, yPos) {
        this.scene.EnemyPool.remove(this);
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(xPos, yPos);
    }

    die() {
        this.scene.ActiveEnemies.killAndHide(this);
        this.scene.ActiveEnemies.remove(this);
        this.scene.EnemyPool.add(this);
        //otras funcionalidades como 
    }


}
