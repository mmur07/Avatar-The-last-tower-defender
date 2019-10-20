import Tower from "./Tower.js"

export default class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    let jojoBG =  this.load.image('jojoBG','./img/thunderSplit.png');
    this.load.image('jojoSprite','./img/jojoSprite.png');
  }

  create() {
    let DIO = new Tower(this,1,400,400, 5, 2);
    DIO.setScale(.2);
  }

  update(time, delta) {    
    
  }
  
}