import Elemental from "./Elemental.js";

const reduceVal = 100000;
export default class Enemy extends Elemental {
    constructor(scene, spritename, element, xPos, yPos, hp, speed) {
        super(scene, spritename, element, xPos, yPos)
        this._speed = speed;
        this._reducedSpeed = speed / reduceVal;
        this._hp = hp;
        this.scene.add.existing(this);
        this.setScale(0.1);
        this.gps = {ruta: 0, nodo: 0, pos: new Phaser.Math.Vector2()};
        this.comienzaRuta();
    }
    comienzaRuta(){
        this.gps.nodo = 0;
        this.scene.path.getPoint(this.gps.nodo,this.gps.pos);
        this.setPosition(this.gps.pos.x,this.gps.pos.y);
    }
    sigueRuta(delta){
        //console.log(this.scene.path);
        this.gps.nodo += this._reducedSpeed;
        //console.log(this.gps.nodo);
        this.scene.path.getPoint(this.gps.nodo,this.gps.pos);
        // this.gps.dir = nextPt;
        this.setPosition(this.gps.pos.x,this.gps.pos.y);
        if(this.gps.nodo >= 1){
            //aquí lo que pasa si llega al núcleo
        }
    }
    get hp() {
        return this._hp;
    }

    update(delta) {
        this.sigueRuta(delta);
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
