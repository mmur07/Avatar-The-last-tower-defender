//fire 0  water 1 earth 2
export default class Elemental extends Phaser.GameObjects.Sprite{

    constructor(scene,element,xPos, yPos){
        super(scene,xPos,yPos,'jojoSprite');
        this._elem = element;
        //this.anchor.setTo(0.5,0.5);
        this.scene.add.existing(this);
    }
    // dmgMultiplier(dmgElement){
    //     let rel = ((dmgElement+1)%3) - this.elem;
    //     switch(rel){
    //         case 1://vulnerable
    //             return 1.5;
    //         case -1://resistente
    //             return 0.5;
    //         default://neutral
    //             return 1;
    //     }
    //}

    // getTOPO()  {

    //     return this._element.FIRE;
    // }


}
Elemental.prototype.dmgMultiplier = function (dmgElement) {
    //let rel = ((dmgElement+1)%2) - this.elem;
    let vul = (this._elem+1)%3;
    let res = ((this._elem+2)%3)
    switch(dmgElement){
        case vul:
            return 1.5;
        case res:
            return 0.5;
        default:
            return 1;
    }
}
