# Phaser Day
* **Objective** - To implement a simple platformer using the [phaser.js](https://phaser.io/) framework.
* **Purpose** - To gain familiarity with basic JavaScript


## Overview
### What is Phaser?
* [Phaser.js](https://phaser.io/) is a javascript framework used to create browser games



### Stages of Game
* [Part 0 - Opening the editor](https://codepen.io/git-leon/pen/agpZox)
* [Part 1 - Configuring the game design](https://codepen.io/git-leon/pen/gNLzWZ)
* [Part 2 - Stubbing Game Design](https://codepen.io/git-leon/pen/gNLzWZ)
* [Part 3 - Loading the game assets](https://codepen.io/git-leon/pen/pXNVdg)
* [Part 4 - Displaying game assets](https://codepen.io/git-leon/pen/XLNqoe)
* [Part 5 - Generating Platforms](https://codepen.io/git-leon/pen/MMbGZp)
* [Part 6 - Create player](https://codepen.io/git-leon/pen/NZbMeG)
* [Part 7 - Adding player animations](https://codepen.io/git-leon/pen/wLoXaM)
* [Part 8 - Adding Collision Detection](https://codepen.io/git-leon/pen/Prbaqw)
* [Part 9 - Adding Controls](https://codepen.io/git-leon/pen/vqyrEw)
* [Part 10 - Adding Bouncing Stars]()
* [Part 11 - Creating Obstacles]()
* [Part 12 - Ending the Game]()













### Part 1A - Configuring the Game Environment
* Navigate to `https://codepen.io/git-leon/pen/agpZox` to begin editing code in editor
* Configure the game by adding the following JavaScript code to your editor.

```JavaScript
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
```

### Part 1B - Making Global Variables
* We will also need to make a few variables available to us across _function scopes_
* Add the code snippet below to the editor

```JavaScript
var game = new Phaser.Game(config);
var player;
var stars;
var boulders;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
```


### Part 2 - Fulfilling the Phaser interface
* Phaser expects the following three _functions_ to be defined
* It uses these _functions_ to create the game behavior.
    * `preload`
        * first function called.
        * Used to load game assets
        * Should not create any objects in this method that require assets that you're also loading in this method, as they won't yet be available.
    * `create`
        * called after `preload` has completed.
        * includes loading of assets from the Loader.
        * If you don't have a `preload` method then `create` is the first method called.
    * `update`
        * called after `create` has completed.
        * is called during the core game loop
* To add the three functions to your code, copy and paste the code snippet below into the editor
```JavaScript
function preload (){}
function create (){}
function update (){}
```












### Part 3A - Loading Assets
* Modify the `preload` function to register each _image-path_ to an _asset-key_.
    * An _image-path_ is the exact location that an image can be found
    * An _asset-key_ is a way to refer to a specific object, in this case images
    * Registering an asset can be done with the following syntax
        * `this.load.image('asset-key', 'image-path');`

| asset-key | image-path                                                        | description            |
|-----------|-------------------------------------------------------------------|------------------------|
| sky       | `https://cd-codepen-game.s3.us-east-2.amazonaws.com/sky.png`      | background image       |
| ground    | `https://cd-codepen-game.s3.us-east-2.amazonaws.com/platform.png` | ground image           |
| star      | `https://cd-codepen-game.s3.us-east-2.amazonaws.com/star.png`     | collectible item image |
| boulder   | `https://cd-codepen-game.s3.us-east-2.amazonaws.com/bomb.png`     | boulder image          |
| player    | `https://cd-codepen-game.s3.us-east-2.amazonaws.com/dude.png`     | player image           |


### Part 3B - Loading Player
* We must also load the sprite sheet associated with our character.
    * Registering the sprite sheet can be done with the following code block.

```
this.load.spritesheet(
    'player',
    'https://cd-codepen-game.s3.us-east-2.amazonaws.com/dude.png',
    { frameWidth: 32, frameHeight: 48 });
```











### Part 4 - Add the Loaded Images
* Modify the `create` function to add `sky` to display list using the the _asset-key_ from the `preload` function.
    * Images can be added to display list after being loaded by using the following syntax
        * `this.add.image(xCoordinate, yCoordinate, 'asset-key');`
    * `sky` should be placed at the center of the world; `(400, 300)`
	    * `this.add.image(400, 300, 'sky');`













### Part 5 - Generating Platforms
* platforms are used rigid bodies that other object can _stand_ on.
* Create a `platformGenerator` to generate other platforms on the screen.
    * `platformGenerator = this.physics.add.staticGroup();`
* Generate the base platform using the code snippet below

```JavaScript
var bottomPlatform = platformGenerator.create(400, 568, 'ground');
bottomPlatform.setScale(2).refreshBody();
```

* Generate other platforms using the code sample below with the following coordinates
    * `platformGenerator.create(xCoordinate, yCoordinate, 'ground')'`
        * `600, 400`
        * ` 50, 250`
        * `750, 220`








### Part 6 - Create player
* In the `create` function, create a sprite and it to `player`.
    * `player = this.physics.add.sprite(100, 450, 'player');`
* After creating the `player`, add bounciness and collision detection

```JavaScript
player.setBounce(0.2);
player.setCollideWorldBounds(true);
```











### Part 7 - Add player animations
* To ensure that our `player` is animated we must add the code below to the `create` function

#### Part7A - Making Left Animation
* The `left` animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
* The `repeat -1` value tells the animation to loop repeatedly

```JavaScript
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});
```




#### Part7B - Making Right Animation
* The `left` animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second.
* The `repeat -1` value tells the animation to loop repeatedly

```JavaScript
this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
```






#### Part7C - Making Turn Animation
* Use the code below to add an animation that allows the player to face the screen

```JavaScript
this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
});
```





### Part 8 - Adding collision detection
* Ensure that the `player` can collide with the platforms by adding the command below to the `create` function
	* `this.physics.add.collider(player, platformGenerator);`



### Part 9 - Adding controls
* In the `create` function, create a `cursor` to check for keyboard input
    * `cursors = this.input.keyboard.createCursorKeys();`
* Next, we can add controls to the player with the code below.
	1. We first check if the `left` key is pressed.
		* if it is pressed, then move `player` on the `X` axis
    * We then check if the `right` key is pressed.
		* if it is pressed, then move `player` in opposite direction on `X` axis
    * Next, we check if `right` and `left` key are **NOT** pressed.
		* if neither is pressed, then tell `player` to face camera
    * Finally, we check if `up` key is pressed and player is on ground
        * if both are true, then move `player` on the `Y` axis (jump)

* Copy and paste the code below into your `update` function.

```JavaScript
if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
}
if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
}
if (!cursors.right.isDown && !cursors.left.isDown) {
    player.setVelocityX(0);
    player.anims.play('turn');
}
if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
}
```






### Part 10 - Adding Bouncing Stars
* Copy and paste the code below into the `create` function to create `star` objects.

```JavaScript
stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
});
```



* Copy and paste the code below into the `create` function to add a bouncing property to the `star` objects.

```JavaScript
stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});
this.physics.add.collider(stars, platformGenerator);
this.physics.add.overlap(player, stars, (p,s)=>{s.disableBody(true, true)}, null, this);
```


### Part 11 - Enjoy the Fruits of your Labor
* Play the game and experiment with some of the code values to see how it affects your interactions.
