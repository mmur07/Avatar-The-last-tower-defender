import Elemental from "./Elemental.js";

export default class Tower extends Elemental {

    constructor(scene, element, xPos, yPos, range, cdShoots) {
        console.log("a");
        super(scene, 'towerIconSprite', element, xPos, yPos);
        this._scene = scene;
        this._cdShoots = cdShoots * 1000;
        this._nextShot = 0;//siempre puede disparar al ser creada
        this.lockedEnemy = null;
        //this._spriteName = spriteName;
        this.setOrigin(0.5, 0.5);
        this.scene.ActiveTowers.add(this);
        this.scene.physics.add.existing(this);
        this.body.setCircle(range, 32 - range, 32 - range);
        this.scene.physics.add.overlap(this, this.scene.ActiveEnemies, onCollision);
        this.createContainer();
    }

    createContainer(){
        this.container = this.scene.add.container(this.x, this.y); //Crea el container. Es la hitbox para la acción
        this.container.setSize(64, 64); //Importante definir el tamaño del container antes del setInteractive()
        this.container.setInteractive();
        this.scene.add.existing(this); //Añade el icono a la escena
        this.container.on('pointerup', this.procesaInput, this); //Si el jugador hace click en el container, llama a addTower
        
    }

    procesaInput(pointer){
        console.log("CLIKIASTE LA TORRE WEY");
        if(pointer.leftButtonReleased()){
            this.rotateLeft();
        }
        else if(pointer.rightButtonDown()){
            this.rotateRight();
        }
        else if(pointer.middleButtonReleased()){
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

    shoot(angle) {
        this.scene.SpawnBullet(angle, this.x, this.y);
    }

    looseTarget(){this.lockedEnemy = null;}
    getTarget() {return this.lockedEnemy}

}
function onCollision(obj1, obj2) {
    if (obj1.lockedEnemy == null) {
        obj1.lockedEnemy = obj2;
    }
}