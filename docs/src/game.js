'use strict'
import Elemental from "./Elemental.js";
import elements from "./enum.js";
import Tower from "./Tower.js"
import Enemy from "./Enemy.js";
import TowerIcon from "./TowerIcon.js";


export default class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    let jojoBG =  this.load.image('jojoBG','./img/thunderSplit.png');
    this.load.image('jojoSprite','./img/jojoSprite.png');
    this.load.image('towerIconSprite','./img/towericon.png');
  }
  PoolEnemies(){
    for(let i = 0;i<10;i++){
    let basicEnem = new Enemy(this,'jojoSprite',elements.FIRE,0,0,150,20);
    this.EnemyPool.add(basicEnem);
    this.EnemyPool.killAndHide(basicEnem);
    }
    console.log("EnemyPool filled size: " + this.EnemyPool.getLength());
  }
  SpawnEnemy(elem,x,y){
    let en
    if(this.EnemyPool.getLength() > 0){
      en = this.EnemyPool.getFirstDead();
      en.spawn(x,y);
    }
    else{
      en = new Enemy(this,'jojoSprite',elements.FIRE,x,y,150,20);
    }
    this.ActiveEnemies.add(en);
    console.log(this.ActiveEnemies.getLength() + "Enemigos activos");
    console.log(this.EnemyPool.getLength() + "Enemigos en el pool");
  }
  create() {
    //RINCON DE DEBUGEO DE ADRI, SI ME VES COMENTAME PORQUE ADRI ES GILIPOLLAS
    let iconito = new TowerIcon(this,'towerIconSprite',50,50);
    //let newTower = new Tower(this.scene, 0, 50, 50, 150, 5);
    this.ActiveTowers = this.add.group();
    this.ActiveTowers.add(iconito);
    //this.delete(Adri)
    
    //Pooling de enemigos
    //this.EnemyPool = this.add.group();
    //console.log("EnemyPool init size: " + this.EnemyPool.getLength());
    //this.ActiveEnemies = this.add.group();
    //this.PoolEnemies();
    //this.EnemyPool.killAndHide(this.EnemyPool.getFirstAlive());
    
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
    // if(Phaser.Input.Keyboard.JustDown(this.w)){
    //   this.SpawnEnemy(elements.FIRE,20,20)
    // }
    // if(Phaser.Input.Keyboard.JustDown(this.d)){
    //   if(this.ActiveEnemies.getLength() > 0){
    //     let target = this.ActiveEnemies.getFirstAlive();
    //     target.ReceiveDMG(100,elements.FIRE);
    //   }
    // }
    //RINCON DEL DEBUGEO DE ADRI, COMENTAME PORQUE ADRI ES GILIPOLLAS

  }

  
}