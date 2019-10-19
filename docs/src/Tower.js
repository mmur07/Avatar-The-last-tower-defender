import Elemental from "./Elemental.js";

export default class Tower extends Elemental{

    constructor(scene, element, xPos, yPos, range, cdShoots){
        super(scene, element, xPos, yPos);
        this._range = range;
        this._cdShoots = cdShoots;
        //this._spriteName = spriteName;

        this.scene.add.existing(this);
    }

    changeColor() {
        super.element = (super.element + 1) % 3;
        console.log(super.element);
    }
}