import Wave from "./Wave.js"
import elements from "./enum.js"

const WAVES = [[{normal:5,shield:0,tank:0}],
[{normal:4,shield:0,tank:0},{normal:4,shield:0,tank:0}]
,[{normal:5,shield:0,tank:0},{normal:5,shield:0,tank:0},{normal:5,shield:0,tank:0}]
,[{normal:3,shield:3,tank:0}]
,[{normal:5,shield:1,tank:0},{normal:5,shield:2,tank:0}]
//oleada6
,[{normal:3,shield:2,tank:0},{normal:3,shield:2,tank:0},{normal:3,shield:2,tank:0}]
,[{normal:10,shield:0,tank:0},{normal:10,shield:0,tank:0}]
,[{normal:5,shield:0,tank:0},{normal:0,shield:3,tank:0},{normal:10,shield:0,tank:0}]
,[{normal:5,shield:5,tank:0},{normal:5,shield:5,tank:0}]
,[{normal:5,shield:0,tank:1},{normal:5,shield:0,tank:1}]
//oleada 11
,[{normal:0,shield:2,tank:2},{normal:20,shield:0,tank:0}]];

export default class Spawner {
    constructor(scene, spawnPos, )//lo ideal sería cargarlo desde un JSON
    {
        this._scene = scene;
        this._spawnPos = spawnPos;
        this._actWave = 0;
        this._waves = new Array();
        // this._waves.push(WAVES[WAVES.length-1]);
        WAVES.forEach(w => {
            this._waves.push(this.randomWave(w));
        });
        //{ type: "normal", el: elements.FIRE,route:0, timer: 1 }
        //{ type: "shield", el: elements.WATER,route:0, timer: 1,shields: 5 }
        // {type: "tanky", el: elements.FIRE,route:0, timer: 1, hpRegen: 20}
        // this._waves.push(
        //     //oleada 1
        //     new Wave(this,[{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.WATER,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 5 }]),
        //     //oleada 2
        //     new Wave(this,[{ type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.EARTH,route:1, timer: 5 },
        //     { type: "normal", el: elements.FIRE,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 5 }]),
        //     new Wave(this,[{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 1 },{ type: "normal", el: elements.WATER,route:2, timer: 1 },{ type: "normal", el: elements.FIRE,route:2, timer: 5 },
        //     { type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.EARTH,route:0, timer: 1 },{ type: "normal", el: elements.FIRE,route:0, timer: 1 },{ type: "normal", el: elements.EARTH,route:0, timer: 5 },
        //     { type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.WATER,route:1, timer: 1 },{ type: "normal", el: elements.EARTH,route:1, timer: 1 },{ type: "normal", el: elements.WATER,route:1, timer: 1 }]))
        //     );
    }

    randomWave(batchesArray){
        let data = new Array();
        batchesArray.forEach(batch => {
            for(let i = 0;i<batch.normal;i++){
                let enemyJSon = { type: "normal", el: elements.FIRE,route:0, timer: 1 };
                enemyJSon.type = "normal";
                enemyJSon.el = Math.floor(Math.random()*3);
                enemyJSon.route = Math.floor(Math.random()*4);
                enemyJSon.timer = 1;
                data.push(enemyJSon);
            }
            for(let i = 0;i<batch.shield;i++){
                let enemyJSon = { type: "normal", el: elements.FIRE,route:0, timer: 1 ,shields:5};
                enemyJSon.type = "shield";
                enemyJSon.el = Math.floor(Math.random()*3);
                enemyJSon.route = Math.floor(Math.random()*4);
                enemyJSon.timer = 1;
                enemyJSon.shields = 5;
                data.push(enemyJSon);
            }
            for(let i = 0;i<batch.tank;i++){
                let enemyJSon = { type: "normal", el: elements.FIRE,route:0, timer: 1,hpRegen:20 };
                enemyJSon.type = "tank";
                enemyJSon.el = Math.floor(Math.random()*3);
                enemyJSon.route = Math.floor(Math.random()*4);
                enemyJSon.timer = 1;
                enemyJSon.hpRegen = 20;
                data.push(enemyJSon);
            }
            data[data.length-1].timer = 3;
        });
        data[data.length-1].timer = 5;
        data.sort(() => Math.random() - 0.5);
        return new Wave(this,data);
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