import Elemental from "./Elemental.js";
import elements from "./enum.js";
import Tower from "./Tower.js"
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js"

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
  }
  preload() {
    let jojoBG = this.load.image('jojoBG', './img/thunderSplit.png');
    this.load.image('jojoSprite', './img/favicon.png');
    this.load.image('bulletSprite', './img/rocketto.png');
    
  }
  PoolEnemies() {
    for (let i = 0; i < 10; i++) {
      let basicEnem = new Enemy(this, 'jojoSprite', elements.FIRE, 0, 0, 150, 20);
      this.EnemyPool.add(basicEnem);
      this.EnemyPool.killAndHide(basicEnem);
    }
    console.log("EnemyPool filled size: " + this.EnemyPool.getLength());
  }
  PoolBullets() {
    for (let i = 0; i < 200; i++) {
      let bull = new Bullet(this, 50, 400, 90, 10, 100,elements.FIRE, 'bulletSprite');
      this.BulletPool.add(bull);
      this.BUlletPool.killAndHide(bull);
    }
  }
  SpawnEnemy(elem, x, y) {
    let en
    if (this.EnemyPool.getLength() > 0) {
      en = this.EnemyPool.getFirstDead();
      en.spawn(x, y);
    }
    else {
      en = new Enemy(this, 'jojoSprite', elements.FIRE, x, y, 150, 20);
    }
    this.ActiveEnemies.add(en);
    console.log(this.ActiveEnemies.getLength() + "Enemigos activos");
    console.log(this.EnemyPool.getLength() + "Enemigos en el pool");
  }
  SpawnBullet(angle, x, y) {
    let b;
    if (this.BulletPool.getLength() > 0) {
      b = this.BulletPool.getFirstDead();

    }
    else {
      b = new Bullet(this, 50, 400, 90,1, 100, elements.FIRE, 'bulletSprite');
    }
    b.fire(x, y, angle);
  }
  CreatePath() {
    let graphics = this.add.graphics();
    this.path = this.add.path(50,0)

    this.path.lineTo(50,250); 
    let a = this.path.getPoint(0.5);
    console.log("init" + a.y);
    this.path.lineTo(800,250);
    this.path.lineTo(800,250); 
    this.path.lineTo(800,1000);
    graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    this.path.draw(graphics);
    // this.paths = this.add.group();
  }
  create() {
    this.CreatePath();
    //Pooling de enemigos
    this.EnemyPool = this.add.group();
    console.log("EnemyPool init size: " + this.EnemyPool.getLength());
    this.ActiveEnemies = this.physics.add.group();
    this.ActiveEnemies.runChildUpdate = true;
    this.PoolEnemies();
    this.EnemyPool.killAndHide(this.EnemyPool.getFirstAlive());

    
    this.BulletPool = this.add.group();
    this.ActiveBullets = this.physics.add.group();
    this.physics.add.overlap(this.ActiveBullets,this.ActiveEnemies,bulletHitEnemy)
    //input
    this.w = this.input.keyboard.addKey('W');
    this.d = this.input.keyboard.addKey('D');
    //let DIO = new Enemy(this,'jojoSprite',elements.FIRE,400,400,150,20);
    //let hpbug = DIO.hp;
    //console.log(hpbug);
    //DIO.ReceiveDMG(50,elements.FIRE);
    //hpbug = DIO.hp;
    //console.log(hpbug);
    //if(!DIO.ReceiveDMG(150,elements.WATER)){
    //  console.log('MORIDO');
    //   DIO.die();
    // }
    // hpbug = DIO.hp;
    //console.log(hpbug);

  }

  update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.w)) {
      this.SpawnEnemy(elements.FIRE, 20, 20)
    }
    if (Phaser.Input.Keyboard.JustDown(this.d)) {
      if (this.ActiveEnemies.getLength() > 0) {
        let target = this.ActiveEnemies.getFirstAlive();
        target.ReceiveDMG(100, elements.FIRE);
      }
    }
    this.ActiveEnemies.getChildren().forEach(enem => {
      enem.update(delta);
    });
    this.ActiveBullets.getChildren().forEach(bullet => {
      bullet.update(delta);
    });
  }
    
}
function bulletHitEnemy(bullet,enemy) {
    bullet.hitEnemy(enemy);
}