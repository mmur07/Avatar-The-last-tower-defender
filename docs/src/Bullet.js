import Elemental from "./Elemental.js";

export default class Bullet extends Elemental {
    constructor(scene, xPos, yPos, angle, speed, damage, elto, spritename) {
        super(scene, spritename, elto, xPos, yPos)
        this.setScale(0.1);
        this.scene.physics.add.existing(this).setScale(0.2);
        this._speed = speed;
        this._angle = angle;
        this._dmg = damage;
        this._dx = 0; this._dy = 0;
        this.scene.add.existing(this);
    }
    fire(xPos, yPos, angle) {
        this.scene.ActiveBullets.add(this);
        this.scene.BulletPool.remove(this);
        this.setActive(true);
        this.setVisible(true);
        this.x = xPos;
        this.y = yPos
        this.setPosition(this.x, this.y);
        this._angle = angle;
        this._dx = Math.cos(this._angle);
        this._dy = Math.sin(this._angle);
    }
    hitEnemy(en) {
        en.ReceiveDMG(this._dmg, this._elem);
        this.scene.ActiveBullets.killAndHide(this);
        this.scene.ActiveBullets.remove(this);
        this.scene.BulletPool.add(this);
    }
    update(delta) {
        this.x += this._dx * (this._speed * delta);
        this.y += this._dy * (this._speed * delta);
    }
    setDmg(newDmg){
        this._dmg = newDmg;
    }

}