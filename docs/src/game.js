
import elements from "./enum.js"
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
    let bg = this.add.image(700,400,'jojoBG');
    bg.setScale(.7);
    let DIO = new Tower(this,elements.FIRE, 50, 50, 20, 1, 'jojoSprite');
    console.log(mul);
  }

  update(time, delta) {    
    
  }
  
}