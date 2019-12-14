import TowerIcon from './TowerIcon.js'

const towerData = {normal:{cost: 70,range:150,cadencia:0.5,dmg:40,area:false,name: "NormalT"},
speedWagon:{cost: 50,range:225,cadencia:0.2,dmg:1000000000,area:false, name: "QuickT"},
ratt:{cost: 100,range:300,cadencia:2,dmg:500,area:false,name: "CannonT"},
aoe:{cost: 125, range:150, cadencia: 1.5, dmg: 100, area: true, name: "AoeT"}}; 

export default class HUD {
    constructor(scene, width, height) {
        this._scene = scene;
        this._width = width;
        this._height = height;

        this._gold = 0;
        this._wave = 0;

        let self = this;
        WebFont.load({
            google: {
                families: ['VT323']
            },
            active: function () // se llama a esta función cuando está cargada
            {
                let goldText =
                    self._scene.add.text(self._width * 0.55, self._height * 0.95,
                        'g',
                        { fontFamily: 'VT323', fontSize: 90, color: '#ffffff' })
                goldText.setShadow(2, 2, "#FFD700", 2, false, true);

                self._goldText = self._scene.add.text(self._width * 0.45, self._height * 0.90,
                    self._gold,
                    { fontFamily: 'VT323', fontSize: 180, color: '#ffffff' })

                let waveText =
                    self._scene.add.text(self._width * 0.25, self._height * 0.87,
                        'WAVE',
                        { fontFamily: 'VT323', fontSize: 90, color: '#ffffff' })
                waveText.setShadow(2, 2, "#FFD700", 2, false, true);

                self._waveText = self._scene.add.text(self._width * 0.32, self._height * 0.9,
                        self._wave,
                        { fontFamily: 'VT323', fontSize: 180, color: '#ffffff' })
            }
        });
        this.CreateTowerIcons();

    }
    CreateTowerIcons(){
        let iconSize = 16*5;
        let iconOffset = 0.1;
        let centerH = 0.92;
        let w = 0.95;
        let iconN = 0;
        let nameSize = 35;
        let costSize = 45;
        this._normalIcon = new TowerIcon(this._scene, 'NTbuy', this._width * (w-iconOffset*iconN),this._height* centerH,5,towerData.normal,'NormalT');
        let nameT =
        this._scene.add.text(this._width * (w-iconOffset*iconN) - iconSize/2  - 16, this._height * centerH - iconSize - 32,
            'Normal',
            { fontFamily: 'VT323', fontSize: nameSize, color: '#ffffff' })
       nameT.setShadow(2, 2, "#FFD700", 2, false, true);
       let costT =
       this._scene.add.text(this._width * (w-iconOffset*iconN) - iconSize/2 + 16, this._height * centerH + iconSize - 16,
           towerData.normal.cost,
           { fontFamily: 'VT323', fontSize: costSize, color: '#ffffff' })
      costT.setShadow(2, 2, "#FFD700", 2, false, true);
        this._speedIcon = new TowerIcon(this._scene, 'QTbuy', this._width * (w-iconOffset*1), (this._height * centerH),5,towerData.speedWagon,'QuickT');
        this._sniperIcon = new TowerIcon(this._scene, 'CTbuy', this._width *(w-iconOffset*2), this._height * centerH,5,towerData.ratt,'CannonT');
        this.aoeIcon = new TowerIcon(this._scene, 'ATbuy', this._width * (w-iconOffset*3), this._height * centerH ,5,towerData.aoe,'AreaT');
      }

    updateGold(cant) {
        this._gold = cant;
        this._goldText.setText(this._gold);
    }
    updateWave(w) {
        this._wave = w;
        //if(this._waveText ==! undefined)
            this._waveText.setText(this._wave);
       // this.a.setText(this._wave);
    }
    printGold() {
        if (this._goldText === undefined) {

        }
    }
}