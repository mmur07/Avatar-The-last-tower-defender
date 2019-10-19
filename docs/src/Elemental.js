//fire 0  water 1 earth 2
export default class Elemental extends Phaser.GameObjects.Sprite{

    constructor(scene,element,xPos, yPos){
        super(scene,xPos,yPos,'jojoSprite');
        this.elem = element;
        //this.anchor.setTo(0.5,0.5);
        //this.scene.add.existing(this);
    }
    
    get element(){
        return this.elem;
    }

    set element(newElem){
        this.elem = newElem;
    }

}
Elemental.prototype.dmgMultiplier = function (dmgElement) {
    //let rel = ((dmgElement+1)%2) - this.elem;
    let vul = (this.elem+1)%3;
    let res = ((this.elem+2)%3)
    switch(dmgElement){
        case vul:
            return 1.5;
        case res:
            return 0.5;
        default:
            return 1;
    }
}