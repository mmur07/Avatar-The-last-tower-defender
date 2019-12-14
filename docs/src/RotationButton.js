export default class RotationButton extends Phaser.GameObjects.Image {

    constructor(scene, spritename, xPos, yPos, coolDown) {
        super(scene, xPos, yPos, spritename)

        this._spriteKey = spritename;
        this.originX = xPos;
        this.originY = yPos;
        this.rotateAnim = false;
        this.rotationSpeed = 0.4;
        this.canClick = false;
        this.cd = coolDown;
        this.timeToReset = this.cd;
        this.setScale(3);
        this._createHitbox();
        this.rotationObjective = 0;
        this.rotateVals = [0, 120, -120];
    }

    _createHitbox(){
        // this.container = this.scene.add.container(this.originX, this.originX);
        //this.circle = this.scene.add.circle(this.originX, this.originY, 200);
        // this.container.setSize(400, 400);
        this.setInteractive();
        this.scene.add.existing(this);
        this.on('pointerup', () => {
            if (this.canClick){
                this.canClick = false;
                this.rotateAnim = true;
                this.rotationObjective = (this.rotationObjective + 1) % 3;
                this.scene.rotateAllTowers();
            }
        });
    }

    preUpdate(time, delta){
        if (!this.canClick && time >= this.timeToReset){
             this.canClick = true;
             this.timeToReset = time+= this.cd;
        }

        if (this.rotateAnim){
            this.angle = (this.angle + this.rotationSpeed * delta);
            if (this.angle >= (this.rotateVals[this.rotationObjective]) && this.angle <= (this.rotateVals[this.rotationObjective] + 20)){
                this.angle = (this.rotateVals[this.rotationObjective]);
                this.rotateAnim = false;
            }
        }
        
    }

}