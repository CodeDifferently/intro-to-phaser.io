var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

var player;
var stars;
var boulders;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

function preload (){
    this.load.image('sky', 'https://cd-codepen-game.s3.us-east-2.amazonaws.com/sky.png');
    this.load.image('ground', 'https://cd-codepen-game.s3.us-east-2.amazonaws.com/platform.png');
    this.load.image('star', 'https://cd-codepen-game.s3.us-east-2.amazonaws.com/star.png');
    this.load.image('boulder', 'https://cd-codepen-game.s3.us-east-2.amazonaws.com/boulder.png');
    this.load.spritesheet('player', 'https://cd-codepen-game.s3.us-east-2.amazonaws.com/dude.png', { frameWidth: 32, frameHeight: 48 });
}


function create (){
    this.add.image(400,300, 'sky');
    platformGenerator = this.physics.add.staticGroup();
    platformGenerator.create(600, 400, 'ground')'
    platformGenerator.create(50, 250, 'ground')'
    platformGenerator.create(750, 220, 'ground')'
    var bottomPlatform = platformGenerator.create(400, 568, 'ground');
    bottomPlatform.setScale(2).refreshBody();



    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
}


function update (){}