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
                        self._scene.add.text(self._width*0.55, self._height*0.95,
                            'g',
                            { fontFamily: 'VT323', fontSize: 90, color: '#ffffff' })
                    goldText.setShadow(2, 2, "#FFD700", 2, false, true);

                    self._goldText = self._scene.add.text(self._width*0.45,self._height*0.90,
                    self._gold,
                     { fontFamily: 'VT323', fontSize: 180, color: '#ffffff' })

                    let waveText =
                        self._scene.add.text(self._height-200,self._width - self._width*0.9,
                            'g',
                            { fontFamily: 'VT323', fontSize: 90, color: '#ffffff' })
                    waveText.setShadow(2, 2, "#FFD700", 2, false, true);
                }
            });

    }
    updateGold(cant) {
        this._gold = cant;
        this._goldText.setText(this._gold);
    }
    updateWave(w) {
        this._wave = w;
    }
    printGold() {
        if (this._goldText === undefined) {
            
        }
    }
}