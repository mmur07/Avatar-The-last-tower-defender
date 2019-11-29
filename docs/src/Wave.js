export default class Wave {
    constructor(spawner, data) {
        this._spawner = spawner;
        this._nextEn = 0;
        this._enemies = new Array();
        data.forEach(enemy => {
            this._enemies.push(enemy);
        });

    }
    update(time, delta) {
        if (!this.finished()) {
            if (time >= this._nextEn) {
                let en = this._enemies.shift();
                //console.log("Quedan " + this._enemies.length + "en la oleada" + this._spawner._actWave);
                this._spawner.spawn(en);
                this._nextEn = time + (en.timer * 1000);
            }
        }
        else this._spawner.waveEnded();
    }
    finished() {
        return (this._enemies.length === 0);
    }


}