export default class Boot extends Phaser.Scene{
	constructor(){
		super({key:'Boot'});
	}
	preload(){
        this.load.image('patronesTilemap', 'Tilemaps/modded_colored.png');
        this.load.tilemapTiledJSON('tilemap', 'Tilemaps/TD_TilemapBit.json');
        // this.load.json('waveData','./waves,json');  
        let jojoBG = this.load.image('jojoBG', '  img/thunderSplit.png');
        this.load.image('jojoSprite', 'img/favicon.png');
        this.load.image('towerIconSprite', 'img/towerIcon.png');
        this.load.image('hohoho', 'img/HowManyBreadsHaveYouEatenInYourLifetime.png');
        this.load.image('bulletSprite', 'img/rocketto.png');
        this.load.image('speedSprite', 'img/bullethellIcon.png');
        this.load.image('sniperSprite', 'img/sniperIcon.png');
        this.load.image('aoeSprite', 'img/aoeIcon.png');
        this.load.image('aoeBullet', 'img/aoeBullet.png');
        this.load.image('rotationButton', 'img/rotationButton.png');
        this.load.image('tankySprite', 'img/ovaisthevestjojoversion.png');
        this.load.image('NTbuy', 'img/NT_buyIcon.png');
        this.load.image('QTbuy', 'img/QT_buyIcon.png');
        this.load.image('ATbuy', 'img/AT_buyIcon.png');
        this.load.image('CTbuy', 'img/CT_buyIcon.png');
        this.load.image('startButton','img/startButton.png')

        this.load.audio('titleScreen', 'sounds/Music/TitleScreen.mp3');

        this.load.audio('stage1Music', 'sounds/Music/MusicPhase1.mp3');
        this.load.audio('stage2Music', 'sounds/Music/MusicPhase2.mp3');
        this.load.audio('stage3Music', 'sounds/Music/MusicPhase3.mp3');
        this.load.audio('stage4Music', 'sounds/Music/MusicPhase4.mp3');
        this.load.audio('stage5Music', 'sounds/Music/MusicPhase5.mp3');
        this.load.audio('stage6Music', 'sounds/Music/MusicPhase6.mp3');
        this.load.audio('stage7Music', 'sounds/Music/MusicPhase7.mp3');
        this.load.audio('stage8Music', 'sounds/Music/MusicPhase8.mp3');

        this.load.audio('deathSoundMinion', 'sounds/SoundEffects/Enemies/DeathSoundMinion.mp3');
        this.load.audio('deathSoundSkeleton', 'sounds/SoundEffects/Enemies/DeathSoundSkeleton.mp3');
        this.load.audio('deathSoundGolem', 'sounds/SoundEffects/Enemies/DeathSoundGolem.mp3');
        this.load.audio('enemyAttacksVillage', 'sounds/SoundEffects/Enemies/EnemyAttacksVillageSound.mp3');

        this.load.audio('selectButtonSound', 'sounds/SoundEffects/Buttons/SelectButtonSound.mp3');
        this.load.audio('globalRotationSound', 'sounds/SoundEffects/Buttons/GlobalRotationSound.mp3')

        this.load.audio('sellTowerSound', 'sounds/SoundEffects/Towers/SellTowerSound.mp3');
        this.load.audio('buyTowerSound', 'sounds/SoundEffects/Towers/BuildTowerSound.mp3');
        this.load.audio('rotateTowerSound', 'sounds/SoundEffects/Towers/IndividualRotationSound.mp3');
 
    
        let towerFrameInfo = {frameWidth: 17,frameHeight:17,margin: 1};
        let NT = this.load.spritesheet('NormalT',"img/towers/NT_Spritesheet.png",towerFrameInfo);
        this.load.spritesheet('QuickT',"img/towers/QT_Spritesheet.png",towerFrameInfo);
        this.load.spritesheet('CannonT',"img/towers/CT_Spritesheet.png",towerFrameInfo);
        this.load.spritesheet('AreaT',"img/towers/AT_Spritesheet.png",towerFrameInfo);
    
        this.load.spritesheet('BasicEnW',"img/BasicEnemyWater_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('BasicEnF',"img/BasicEnemyFire_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('BasicEnE',"img/BasicEnemyEarth_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})

        this.load.spritesheet('ShieldEnW',"img/ShieldEnemyWater_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('ShieldEnF',"img/ShieldEnemyFire_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('ShieldEnE',"img/ShieldEnemyEarth_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})

        this.load.spritesheet('TankEnF',"img/TankEnemyFire_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('TankEnW',"img/TankEnemyWater_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})
        this.load.spritesheet('TankEnE',"img/TankEnemyEarth_Spritesheet.png",{frameWidth: 16,frameHeight:16,margin: 1})

        

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    
	}
	create(){
		this.scene.start('game');
	}
}