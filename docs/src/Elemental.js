

export default class Elemental extends Phaser.GameObjects.Sprite{

    constructor(scene,element,xPos, yPos){
        super(scene,xPos,yPos);
        this.elem = this.element.element;
    }
    dmgMultiplier(dmgElement){
        let rel = ((dmgElement+1)%3) - this.elem;
        switch(rel){
            case 1://vulnerable
                return 1.5;
            case -1://resistente
                return 0.5;
            default://neutral
                return 1;
        }
    }

    getTOPO()  {
        
        return this._element.FIRE;
    }


}