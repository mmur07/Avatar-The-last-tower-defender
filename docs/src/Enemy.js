import Elemental from "./Elemental.js";

export default class Enemy extends Elemental {

    constructor(scene, spritename, element, xPos, yPos, hp, speed,route, id) {
        super(scene, spritename, element, xPos, yPos)
        this._reduceVal = 10;
        this._speed = speed;
        this._id = id;
        this._hp = hp;
        this.scene.physics.add.existing(this);
        //this.body.setCollideWorldBounds();
        this.scene.add.existing(this);
        this.gps = { ruta: this.scene.getRoute(route), nodo: 0, pos: new Phaser.Math.Vector2() };
        this.setScale(4);
        this.scene.ActiveEnemies.add(this);
        this.comienzaRuta();
        this.play('basic_walk_'+this._elem);
        // this.anims.play('shield_walk_0');
    }
    comienzaRuta() {
        
        //nos situamos al inicio de la ruta
        this.gps.nodo = 0; 
        this.gps.ruta.getPoint(this.gps.nodo, this.gps.pos);
        this.setPosition(this.gps.pos.x, this.gps.pos.y);
        //ajustamos la velocidad a la longitud de la ruta
        this._reducedSpeed = this._speed / (this._reduceVal*this.gps.ruta.getLength());
    }
    sigueRuta(delta) {
        //console.log(this.gps.ruta);
        this.gps.nodo += this._reducedSpeed;
        //console.log(this.gps.nodo);
        this.gps.ruta.getPoint(this.gps.nodo, this.gps.pos);
        // this.gps.dir = nextPt;
        this.setPosition(this.gps.pos.x, this.gps.pos.y);
        if (this.gps.nodo >= 1) {
            //aquí lo que pasa si llega al núcleo
            this.attack();
        }
    }

    healEnemy (val) {
        this._hp += val;
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
        this.sigueRuta(delta);
    }

    ReceiveDMG(dmg, dmgType) {
        console.log('Yo, de tipo ' + this._elem + ' recibo daño de tipo ' + dmgType + '. Bonus: ' + this.dmgMultiplier(dmgType))
        this._hp = this._hp - (this.dmgMultiplier(dmgType) * dmg);
        if (this._hp <= 0) {
            this.die();
        }
    }
    die() {

        this.scene.OnEnemySlain(this);
        //this.destroy();
        //otras funcionalidades como MORIR
    }
    attack() {
        this.scene.OnEnemyAttack(this);
        this.destroy();
    }

    returnId(){
        return this._id;
    }
}


