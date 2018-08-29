// class Enemy
class Enemy {
  constructor(x,y,speed){
    this.x=x;
    this.y=y;
    this.speed=speed;
  }

  update(dt){
    this.x += (this.speed * dt);
    if(this.x>605){
      function randomX() {
        return Math.random() * 200;
        }
      this.x=-101-randomX();
    }
    if((player.x+18<this.x+90)&&
      (player.x+83>this.x)&&
      (player.y<this.y+60)&&
      (player.y+60>this.y)){
        setTimeout(function(){
          player.sprite = 'images/fly.png'
          }, 600);
        player.x=202;
        player.y=400;
        player.sprite = 'images/hit.png';
        hitSound.play();
        counter-=1;
        count.innerHTML = counter;
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};//end class Enemy


//Meteor is the subclass of Enemy
class Meteor extends Enemy{
  constructor(x,y,speed){
    super(x,y,speed);
    this.sprite = 'images/enemy-meteor.png';
  }
}//end Meteor


//Rocket is the subclass of Enemy
class Rocket extends Enemy{
  constructor(x,y,speed){
    super(x,y,speed);
    this.sprite = 'images/enemy-rocket.png';
  }
}//end Rocket


// class Player
class Player{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.sprite = 'images/fly.png';
  }

  update(){
  // engine.js calls this empty method
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key){
    if(key=='left'){
      this.x-=101;
    }
    if(key=='right'&& this.x<350){
      this.x+=101;
    }
    if(key=='up'&& this.y>0){
      this.y-=83;
    }
    if(key=='down'&& this.y<360){
      this.y+=83;
    }
    if(this.y<=0){
      setTimeout(function(){
        player.sprite = 'images/fly.png'
      }, 2000);
      this.x=202;
      this.y=400;
      this.sprite = 'images/win.png';
      finishSound.play();
      counter+=1;
      count.innerHTML = counter;
        if(counter===5){
          winner.style.display = "block";
          winSound.play();
        };
    }
  }
}//end class Player


// Instantiate Enemies and Player.
// All Enemies are placed in an array called 'allEnemies'.
// var player = the player object.
var allEnemies=[];
var player=new Player(202,400);
var enemy1=new Meteor(-100,225,100)
var enemy2=new Rocket(-100,140,160)
var enemy3=new Meteor(-390,55,130)
var enemy4=new Rocket(-100,310,200)
var enemy5=new Meteor(-690,55,80)
var enemy6=new Meteor(-100,140,140)
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6);


//class Sound
class Sound{
    constructor(src){
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function() {
        this.sound.play();
        }
      }
}// end class Sound


//Instanciate sound-effects
var hitSound = new Sound('sounds/hit.mp3');
var finishSound = new Sound('sounds/finish.mp3');
var winSound=new Sound('sounds/win.mp3');



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


//The replay function resets the counter and hides the "winner pop-up".
function rePlay(){
  winner.style.display = "none";
  counter=0;
  count.innerHTML = counter;
};

//declaration of the winner-"pop-up" variables and Event Listener(s)
//declaration of the counter variables.
const newGame = document.querySelector("#newgame");
newGame.addEventListener("click", rePlay);
var winner = document.getElementById('winner');
let counter=0;
let count=document.getElementById("count");
