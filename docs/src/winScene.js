const WIN_WIDTH = 1984, WIN_HEIGTH = 1984;

export default class Game extends Phaser.Scene{
    constructor(){
    super({key: 'winGame'});
    }
    create(){
            let t = this.add.text(WIN_WIDTH /2 ,WIN_HEIGTH/2,'CONGRATULATIONS! YOU SAVED THE VILLAGE',{ fontFamily: 'VT323', fontSize: 50, color: '#38d973' });
            t.setOrigin(0.5,0.5);
    }
}