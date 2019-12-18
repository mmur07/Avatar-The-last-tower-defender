const WIN_WIDTH = 1984, WIN_HEIGTH = 1984;

export default class Game extends Phaser.Scene{
    constructor(){
    super({key: 'endGame'});
    }
    create(){
            let t = this.add.text(WIN_WIDTH /2 ,WIN_HEIGTH/2,'OH NO! YOU LOST',{ fontFamily: 'VT323', fontSize: 50, color: '#e6482e' });
            t.setOrigin(0.5,0.5);
    }
}