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

  }

  update(time, delta) {    
  }
}