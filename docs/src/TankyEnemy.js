import Enemy from "./Enemy.js"

export default class TankyEnemy extends Enemy {
    constructor(scene, spritename, element, xPos, yPos, hp, speed,route, hpRegen, id) {
        super(scene, spritename, element, xPos, yPos, hp, speed, route, id)
        //this.setScale(0.1);  //Medida temporal para que Iggy no ocupe toda la pantalla
        
        this._hpRegen = hpRegen; //Cantidad que va a cuarar
        this._cdHeal = 850; //Tiempo que tarda el enemigo en curarse

        this._nextCycleHeal = 0;
        this.anims.stop();
        this.anims.play('tank_walk_'+this._elem);
    }
    preUpdate(time, delta){
        super.preUpdate(time, delta);
        if (time >= this._nextCycleHeal){
            super.healEnemy(this._hpRegen);
            this._nextCycleHeal = time += this._cdHeal;
        }
    }
}