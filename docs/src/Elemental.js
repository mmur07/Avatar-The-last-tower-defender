//fire 0  water 1 earth 2
export default class Elemental extends Phaser.GameObjects.Sprite {

    constructor(scene, spritename, element, xPos, yPos,frame) {
        super(scene, xPos, yPos, spritename,frame);
        this._elem = element;
        //this.anchor.setTo(0.5,0.5);
        this.scene.add.existing(this);
    }

    rotateRight() {
        this._elem = (this._elem + 1) % 3;
        console.log(this._elem);
    }
    rotateLeft() {
        this._elem = (this._elem + 2) % 3;
        console.log(this._elem);
    }
    getElem(){
        return this._elem;
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
    }


}
Elemental.prototype.dmgMultiplier = function (dmgElement) {
    //let rel = ((dmgElement+1)%2) - this.elem;
    let vul = (this._elem + 1) % 3;
    let res = ((this._elem + 2) % 3)
    switch (dmgElement) {
        case vul:
            return 1.5;
        case res:
            return 0.5;
        default:
            return 1;
    }
}
