export default class Pool extends Phaser.GameObjects.Group {
    constructor(scene, isPhysical,poolItem,baseSize) {
        super();
        this._scene = scene;
        this._group;
        if (isPhysical)
            this._group = this._scene.physics.add.group();
        else
            this._group = this._scene.add.group();
        for(let i = 0;i<baseSize;i++){
            this._group.add(poolItem);
        }
    }
    giveItemTo(item,otherPool){
        this._group.remove(item);
        otherPool.add(item);
    }
    killItem(item){
        this._group.killAndHide(item);
    }
    clone(obj){

    }
}