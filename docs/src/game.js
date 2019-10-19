import Elemental from "./Elemental.js"
const _element ={FIRE: 0,WATER: 1, EARTH: 2}
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
    DIO = new Elemental(this,_element.FIRE,50,50);
  }

  update(time, delta) {    
    DIO.dmgMultiplier(_element.WATER);
  }
}