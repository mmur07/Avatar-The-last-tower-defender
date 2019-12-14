import Wave from "./Wave.js"
import elements from "./enum.js"

export default class Spawner {
    constructor(scene, spawnPos, )//lo ideal sería cargarlo desde un JSON
    {
        this._scene = scene;
        this._spawnPos = spawnPos;
        this._actWave = 0;
        this._waves = new Array();
        this._waves.push(new Wave(this, [{ type: "normal", el: elements.FIRE, timer: 0.5 }, {type: "tanky", el: elements.WATER, timer: 0.5, hpRegen: 20},
        { type: "normal", el: elements.FIRE, timer: 0.5 },{type: "shield", el: elements.FIRE, timer:0.5, shields: 3},
        { type: "normal", el: elements.FIRE, timer: 2 }, { type: "normal", el: elements.FIRE, timer: 2 }]),new Wave(this,[{ type: "shields", el: elements.FIRE, timer: 0.5 }]));
    }
    update(time, delta) {
        //console.log("Spawner actualizándose");
        if (this._actWave < this._waves.length) {
            //console.log("Actualizando la ola: " + this._actWave);
            this._waves[this._actWave].update(time, delta);
        }
    }
    spawn(enemy) {
        switch (enemy.type) {
            case "normal":
                this._scene.SpawnEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y);
                break;
            case "shield":
                this._scene.SpawnShieldedEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y,enemy.shields);
                break;
            case "tanky":
                this._scene.SpawnTankyEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y, enemy.hpRegen);
        }
    }
    waveEnded() {
        this._actWave++;
        this._scene._HUD.updateWave(this._actWave);
    }
}