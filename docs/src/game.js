import Elemental from "./Elemental.js";
import elements from "./enum.js";
import Enemy from "./Enemy.js";

export default class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    let jojoBG =  this.load.image('jojoBG','./img/thunderSplit.png');
    this.load.image('jojoSprite','./img/jojoSprite.png');
  }

  create() {
    this.PoolEnemies = this.game.add.group();
    this.PoolEnemies.add(new Enemy(this,'jojoSprite',elements.FIRE,400,400,150,20));
    
    let hpbug = DIO.hp;
    console.log(hpbug);
    DIO.ReceiveDMG(50,elements.FIRE);
    hpbug = DIO.hp;
    console.log(hpbug);
    if(!DIO.ReceiveDMG(150,elements.WATER)){
      console.log('MORIDO');
      DIO.die();
    hpbug = DIO.hp;
    console.log(hpbug);

  }

  update(time, delta) {    
    
  }
  
}