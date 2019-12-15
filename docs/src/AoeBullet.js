import Elemental from "./Elemental.js";

export default class AoeBullet extends Elemental {
    constructor(scene, xPos, yPos, timeToDisapear, range, damage, elto, spritename) {
        super(scene, spritename, elto, xPos, yPos);
        this.growingRange = 1;
        this.scene.physics.add.existing(this);
        this.body.setCircle(8, 24, 24);
        this._timeToDisapear = timeToDisapear;
        this._dmg = damage;
        this.scene.add.existing(this);
        this._range = range;
        this.arrayEnemiesID = [];
        this.arrayEnemiesIDSize = 0;
    }
    fire(xPos, yPos, newRange) {
        this.growingRange = 1;
        super.setScale(this.growingRange);
        this.scene.activeAoeBullets.add(this);
        this.scene.aoeBulletPool.remove(this);
        this.setActive(true);
        this.setVisible(true);
        this.x = xPos;
        this.y = yPos
        this.setPosition(this.x, this.y);
        this._range = newRange;
    }
    hitEnemy(en) {
        if (!this.searchIDEnemy(en.returnId())){
            en.ReceiveDMG(this._dmg, this._elem);
            this.arrayEnemiesID.push(en.returnId());
            this.arrayEnemiesIDSize++;
        }
    }
    preUpdate(delta, time) {
        super.setScale(this.growingRange);
        this.growingRange += 0.75;
        if (this.getBounds().width >= this._range * 8){
            this.scene.activeAoeBullets.killAndHide(this);
            this.scene.activeAoeBullets.remove(this);
            this.scene.aoeBulletPool.add(this);
            this.arrayEnemiesID = [];
        }
    }
    setDmg(newDmg,elem){
        this._dmg = newDmg;
        this._elem = elem;
    }
    searchIDEnemy(id){
        let found = false;
        let k = 0;
        while (!found && k < this.arrayEnemiesIDSize){
            if (this.arrayEnemiesID[k] == id) found = true;
            k++;
        }
        return found;
    }

}