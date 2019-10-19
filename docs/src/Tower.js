import Elemental from "./Elemental";

export default class Tower extends Elemental{

    constructor(scene, element, xPos, yPos, range, cdShoots, spriteName){
        super(scene, element, xPos, yPos);
        this._range = range;
        this._cdShoots = cdShoots;
        this._spriteName = spriteName;
    }

    /*changeColor() {
        let elem = super.element();
    }*/
}