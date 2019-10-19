

import elements from "./enum.js"
import Tower from "./Tower.js"

export default class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('jojoSprite','./img/jojoSprite.png');
  }

  create() {

    let DIO = new Tower(this,elements.FIRE, 50, 50, 20, 1, 'jojoSprite');
    DIO.setScale(.2);
  }

  update(time, delta) {    
    
  }
  
}