// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 1000){
        this.x += this.speed*dt;
    }else{
        this.x = 0;
        this.speed = random();
    }
    if( (Math.abs(player.x - this.x) < 50)  && (Math.abs(player.y - this.y) < 50) ){
        player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function random(){
    return Math.floor((Math.random() * 200) + 100);
}

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    if(player.y == 0){
        player.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            if (player.y > -80){
                player.y -= 80;
            }
            break;
        case 'left':
            if (player.x > 0){
                player.x -= 100;
            }
            break;
        case 'right':
            if (player.x < 400){
                player.x += 100;
            }
            break;
        case 'down':
            if (player.y < 400){
                player.y += 80;
            }
            break;
        default:
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var enemy1 = new Enemy(0, 80);
var enemy2 = new Enemy(-320, 160);
var enemy3 = new Enemy(-480, 240);
var enemy4 = new Enemy(-80, 80);
var enemy5 = new Enemy(0, 160);
var enemy6 = new Enemy(-160, 240);
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
