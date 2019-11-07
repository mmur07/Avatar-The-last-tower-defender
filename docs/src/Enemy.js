import Elemental from "./Elemental.js";

export default class Enemy extends Elemental {
    constructor(scene, spritename, element, xPos, yPos, hp, speed) {
        super(scene, spritename, element, xPos, yPos)
        this._speed = speed;
        this._hp = hp;
        this.scene.add.existing(this);
        this.setScale(0.1);
        this.gps = {ruta: 0, nodo: 0, dir: new Phaser.Math.Vector2()};
        this.comienzaRuta();
    }
    comienzaRuta(){
        console.log("TONTO");
        this.gps.nodo = 0;
        this.scene.path.getPoint(this.gps.nodo,this.gps.dir);
        this.setPosition(this.gps.dir.x,this.gps.dir.y);
    }
    sigueRuta(delta){
        //console.log(this.scene.path);
        this.gps.nodo += this._speed * 1/100000;
        console.log(this.gps.nodo);
        this.scene.path.getPoint(this.gps.nodo,this.gps.dir);
        // this.gps.dir = nextPt;
        this.setPosition(this.gps.dir.x,this.gps.dir.y);
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
