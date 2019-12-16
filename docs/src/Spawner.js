import Wave from "./Wave.js"
import elements from "./enum.js"

export default class Spawner {
    constructor(scene, spawnPos, )//lo ideal sería cargarlo desde un JSON
    {
        this._scene = scene;
        this._spawnPos = spawnPos;
        this._actWave = 0;
        this._waves = new Array();
        this._waves.push(
            new Wave(this, [{ type: "normal", el: elements.FIRE,route:0, timer: 1 }, {type: "normal", el: elements.FIRE,route:0, timer: 1, hpRegen: 20},
        { type: "normal", el: elements.WATER,route:1, timer: 20 }]),
        new Wave(this,[{ type: "normal", el: elements.EARTH,route:0, timer: 1 },{ type: "normal", el: elements.EARTH,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },
        { type: "normal", el: elements.EARTH,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.EARTH,route:0, timer: 1 },{ type: "normal", el: elements.EARTH,route:0, timer: 20 }]),
        new Wave(this,[{ type: "shield", el: elements.WATER,route:0, timer: 1,shields: 5 },{ type: "shield", el: elements.FIRE,route:0, timer: 20,shields: 5 }]),
        new Wave(this,[{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 1 },
        { type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },,
        { type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },
        { type: "shield", el: elements.EARTH,route:3, timer: 1,shields: 5 }]));
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
                this._scene.SpawnEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y,enemy.route);
                break;
            case "shield":
                this._scene.SpawnShieldedEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y,enemy.shields,enemy.route);
                break;
            case "tanky":
                this._scene.SpawnTankyEnemy(enemy.el, this._spawnPos.x, this._spawnPos.y, enemy.hpRegen,enemy.route);
        }
    }
    waveEnded() {
        this._actWave++;
        this._scene._HUD.updateWave(this._actWave);
    }
}