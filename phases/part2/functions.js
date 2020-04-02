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

function preload (){}
function create (){}
function update (){}