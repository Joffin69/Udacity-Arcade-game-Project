// Enemies our player must avoid
var Enemy = function(x,y,speed) {
   
    this.x = x;
	this.y = y;
	this.speed = speed ;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + this.speed * dt;
	
	if(this.x >= 505){
		this.x = 0;
	}
	this.checkCollisions(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
	
	this.x= x;
	this.y =y;
	this.speed = speed;
	this.sprite = "images/char-boy.png";
};
Player.prototype.update = function(){
	 
	if(this.y > 383){
		this.y = 383;
	}	
	if(this.x > 402.5){
		this.x = 402.5;
	}
	if(this.x < 2.5){
		this.x = 2.5;
	}
	
}
Player.prototype.handleInput = function(keypress){
	
	if(keypress == "left"){
		this.x -= this.speed;
	}
	if(keypress == "right"){
		this.x += this.speed;
	}
	if(keypress == "up"){
		this.y -= this.speed - 20;
	}
	if(keypress == "down"){
		this.y += this.speed - 20;
	}
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
};

Enemy.prototype.checkCollisions = function(anenemy){
	
	var score = 0;
	if (
        player.y + 131 >= anenemy.y + 90
        && player.x + 25 <= anenemy.x + 88
        && player.y + 73 <= anenemy.y + 135
        && player.x + 76 >= anenemy.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }
	
	if (player.y + 63 <= 0) {        
        player.x = 202.5;
        player.y = 383;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
    difficulty(score);  		
	}
	
	
};

var difficulty = function(num){
	
	 //allEnemies.length = 0;

    // add new set of enemies
    for (var i = 0; i <= num; i++) {
        var enemy = new Enemy(0, Math.random() * 150+50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202.5,383,50);
var enemy = new Enemy(0,Math.random()*150+50,Math.random()*256);
var allEnemies = [];
allEnemies.push(enemy);


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
