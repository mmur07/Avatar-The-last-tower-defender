import Elemental from "./Elemental.js";
import elements from "./enum.js";
import Tower from "./Tower.js"
import Enemy from "./Enemy.js";
import Bullet from "./Bullet.js"
import TowerIcon from "./TowerIcon.js";
import Pool from "./Pool.js";
import Spawner from "./Spawner.js";

const WIN_WIDTH = 1984, WIN_HEIGTH = 1984;

export default class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('patronesTilemap', '/img/towerDefense_tilesheet.png');
    this.load.tilemapTiledJSON('tilemap', '/tilemaps/TD_Tilemap.json');
    // this.load.json('waveData','./waves,json');  
    let jojoBG = this.load.image('jojoBG', './img/thunderSplit.png');
    this.load.image('jojoSprite', './img/favicon.png');
    this.load.image('towerIconSprite', './img/towericon.png');
    this.load.image('hohoho', './img/HowManyBreadsHaveYouEatenInYourLifetime.png');
    this.load.image('bulletSprite', './img/rocketto.png');
  }
  PoolEnemies() {
    for (let i = 0; i < 10; i++) {
      let basicEnem = new Enemy(this, 'jojoSprite', elements.FIRE, 400, 400, 150, 20);
      this.EnemyPool.add(basicEnem);
      this.EnemyPool.killAndHide(basicEnem);
    }
  }
  PoolBullets() {
    for (let i = 0; i < 200; i++) {
      let bull = new Bullet(this, 50, 400, 90, 10, 100, elements.FIRE, 'bulletSprite');
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
      en = new Enemy(this, 'jojoSprite', elements.FIRE, x, y, 400, 400);
    }
    this.ActiveEnemies.add(en);
  }
  SpawnBullet(angle, x, y) {
    let b;
    if (this.BulletPool.getLength() > 0) {
      b = this.BulletPool.getFirstDead();

    }
    else {
      b = new Bullet(this, 50, 400, 90, 1, 100, elements.FIRE, 'bulletSprite');
    }
    b.fire(x, y, angle);
  }
  CreatePath() {
    let graphics = this.add.graphics();
    this.path = this.add.path(-50, 350)
    this.path.lineTo(50, 350)
    //let PiscinaDeEnemigos = new Pool(this,true,);
    this.path.lineTo(375, 750);
    // let a = this.path.getPoint(0.5);
    // console.log("init" + a.y);
    this.path.lineTo(575, 850);
    this.path.lineTo(800, 1450);
    this.path.lineTo(1000, 1575);
    this.path.lineTo(1400, 1675);
    this.path.lineTo(1650, 1575);
    this.path.lineTo(1700, 1075);
    this.path.lineTo(1850, 700);

    graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    this.path.draw(graphics);
    // this.paths = this.add.group();
  }
  EarnGold(enemy){
    //primero comprobaremos las subclases cuando las implementemos y enemigo por descarte
    if(enemy instanceof Enemy){
      this.player.gold += 10;
    }
    console.log(this.player.gold);
  }

  CreateMap() {

    //this.add.existing(this.map);
    /*this.add.existing(this.nodes);
    this.add.existing(this.default);
    this.add.existing(this.can_place_towers);*/
  }
  create() {
    //Creación del mapa
    //this.CreateMap();
    this.map = this.make.tilemap({
      key: 'tilemap',
      tileWidth: 64,
      tileHeight: 64
    });
    this.tileset = this.map.addTilesetImage('towerDefense_tilesheet', 'patronesTilemap');
    this._nodes = this.map.createStaticLayer('Nodes', this.tileset, 0, 0);
    this.towers = this.map.createDynamicLayer('Towers', this.tileset, 0, 0);
    this._default = this.map.createStaticLayer('Default', this.tileset, 0, 0);
    this.can_place_towers = this.map.createStaticLayer('Can_place_towers', this.tileset, 0, 0);
    this.player = {hp: 20, gold: 0};

    //Modificación de la cámara principal para ajustarse al nuevo mapa
    this.camera = this.cameras.main;
    this.camera.setViewport(0, 0, 1982, 1984);
    this.iconito = new TowerIcon(this, 'towerIconSprite', WIN_WIDTH * 0.95, WIN_HEIGTH * 0.95);
    this.iconito.setScale(3);
    this.CreatePath();
    //let wD = this.cache.json.get('waveData');
    this._Spawner = new Spawner(this, { x: 0, y: 50 });
    //Pooling de enemigos
    this.ActiveTowers = this.add.group();
    this.EnemyPool = this.add.group();
    this.ActiveEnemies = this.physics.add.group();
    this.ActiveEnemies.runChildUpdate = true;
    this.PoolEnemies();
    //this.EnemyPool.killAndHide(this.EnemyPool.getFirstAlive());
    this.BulletPool = this.add.group();
    this.ActiveBullets = this.physics.add.group();
    // function bulletHitEnemy(bullet, enemy) {
    //   bullet.hitEnemy(enemy);
    // }
    // this.physics.add.overlap(this.ActiveBullets,this.ActiveEnemies,bulletHitEnemy);
    this.physics.add.overlap(this.ActiveBullets, this.ActiveEnemies, (bullet, enemy) => bullet.hitEnemy(enemy));
    this.pointer = this.input.activePointer;



    //input
    this.w = this.input.keyboard.addKey('W');
    this.d = this.input.keyboard.addKey('D');
    this.b = this.input.keyboard.addKey('B');


  }

  update(time, delta) {
    if (Phaser.Input.Keyboard.JustDown(this.w)) {
      this.SpawnEnemy(elements.FIRE, 20, 20)
    }
    if (Phaser.Input.Keyboard.JustDown(this.b)) {
      this.SpawnBullet(3 / 2 * Math.PI, 50, 250);
    }
    if (Phaser.Input.Keyboard.JustDown(this.d)) {
      if (this.ActiveEnemies.getLength() > 0) {
        let target = this.ActiveEnemies.getFirstAlive();
        target.ReceiveDMG(100, elements.FIRE);
      }
    }
    if (this.pointer.middleButtonDown()) {
      if (this.towers.getTileAtWorldXY(this.pointer.x, this.pointer.y) != null) {
        this.towers.removeTileAtWorldXY(this.pointer.x, this.pointer.y, true);
      }
    }
    this.ActiveEnemies.getChildren().forEach(enem => {
      enem.update(delta);
    });
    this.ActiveTowers.getChildren().forEach(tow => {
      tow.update(time, delta);
    });
    this.ActiveBullets.getChildren().forEach(bullet => {
      bullet.update(delta);
    });
    this._Spawner.update(time, delta);
  }
}
