export default class Wave{
    constructor(spawner){
        this._spawner = spawner;
        this._nextBacth = 0;
        this._batches = this.add.group();
        this._batches.add({enemies:{normal: 3, shield: 0, regen: 0}, timer: 5});
        this._batches.add({enemies:{normal: 3, shield: 0, regen: 0}, timer: 5});
    }
    preUpdate(time,delta){
        if(time >= this._nextBacth)
            this.spawnBatch();
    }
    spawnBatch(){
        let b = this._batches.getFirstAlive();
        this._spawner.spawn(b);
        this._batches.remove(b);
    }


}