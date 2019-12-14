import Elemental from "./Elemental.js";

export default class Tower extends Elemental {

    constructor(scene, spriteKey, element, xPos, yPos, range, cdShoots, dmg, area) {
        super(scene, spriteKey, element, xPos, yPos,element); 
        let upscaleFactor = 4;
        this._scene = scene;
        this._cdShoots = cdShoots * 1000;
        this._nextShot = 0; //siempre puede disparar al ser creada
        this.lockedEnemy = null;
        this._dmg = dmg;
        this._areadmg = area;
        this._range = range;
        //this._spriteName = spriteName;
        this.setOrigin(0.5, 0.5);
        this.scene.ActiveTowers.add(this);
        this.scene.physics.add.existing(this);
        this.body.setCircle(range/upscaleFactor, (32 - range)/upscaleFactor, (32 - range)/upscaleFactor);
        this.scene.physics.add.overlap(this, this.scene.ActiveEnemies, onCollision);
        this.createContainer();
        this.setScale(upscaleFactor);
        
    }

    createContainer() {
        this.container = this.scene.add.container(this.x, this.y); //Crea el container. Es la hitbox para la acción
        this.container.setSize(64, 64); //Importante definir el tamaño del container antes del setInteractive()
        this.container.setInteractive();
        this.scene.add.existing(this); //Añade el icono a la escena
        this.container.on('pointerup', this.procesaInput, this); //Si el jugador hace click en el container, llama a addTower

    }

    procesaInput(pointer) {
        if (pointer.leftButtonReleased()) {
            this.rotateLeft();
            this.setFrame(this._elem);
        }
        else if (pointer.rightButtonDown()) {
            this.rotateRight();
            this.setFrame(this._elem);          
        }
        else if (pointer.middleButtonReleased()) {
            this.scene.ActiveTowers.remove(this);
            this.scene.deleteTile(this.originX, this.originY);
            this.setActive(false);
            this.setVisible(false);
            this.lockedEnemy = null;
            this.destroy();
        }
    }

    update(time, delta) {
        // if(this.lockedEnemy == undefined) console.log('me vas a comer los cojone phaser de los cojones que eres mas tonto que unos cojones');
        if (this.lockedEnemy != null && time >= this._nextShot) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.lockedEnemy.x, this.lockedEnemy.y);
            this._nextShot = time += this._cdShoots;
            //console.log(angle);          
            this.shoot(angle);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.lockedEnemy != null)
            if (!this.scene.physics.collide(this, this.lockedEnemy))
                this.looseTarget();
    }
    rotateRight(){
        super.rotateRight();
        this.setFrame(this._elem);
    }
    rotateLeft(){
        super.rotateLeft();
        this.setFrame(this._elem);
    }

    shoot(angle) {
        if(!this._areadmg)
            this.scene.SpawnBullet(angle, this.x, this.y,this._dmg);
        else
        {
            this.scene.SpawnAoeBullet(this.x, this.y, this._dmg, this._range);
        }
    }

    looseTarget() { this.lockedEnemy = null; }
    getTarget() { return this.lockedEnemy }

}
function onCollision(obj1, obj2) {
    if (obj1.lockedEnemy == null) {
        obj1.lockedEnemy = obj2;
    }
}