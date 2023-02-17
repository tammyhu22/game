
var screen = 0;
var y=-20;
var x=200;
var speed = 2;
var score= 0;
let imageSprite;
let img;
let Sans;
let musubi;
var rustle;
let bg;
let bm1;
let bm2;
let bm3;
let bm1playing = false;
let bm2playing = false;
let bm3playing = false;

function preload() {
  img = loadImage("assets/spam-box.png");
  musubi = loadImage("assets/musubi.png");
  imageSprite = createSprite(x,y,1,1);
  imageSprite.addImage(musubi);
  Sans = loadFont('assets/DTM-Sans.otf');
  soundFormats('mp3');
  rustle = loadSound('assets/eating.mp3');
  bg = loadImage("assets/spam-background.png");
  bm1 = loadSound("assets/beginning.mp3")
  bm2 = loadSound("assets/middle.mp3")
  bm3 = loadSound("assets/end.mp3")
}


function setup() {
  createCanvas(600, 400);
  bm1.setVolume(0.1);
  bm2.setVolume(0.1);
  bm3.setVolume(0.1);
  rustle.setVolume(0.6);
  console.log("hello");
}

function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}

function startScreen(){
		background(255, 87, 51)
        if(bm1playing === false) {
          bm3.stop();
          bm1.play();
        }
        bm1playing = true;
        imageSprite.visible = false;
		fill(255)
        textFont(Sans);
		textAlign(CENTER);
        textSize(width / 22);
		text('WELCOME TO CATCH-THE-SPAM', width / 2, height / 2)
        textSize(width / 40);
		text('click to start', width / 2, height / 2 + 25);
		reset();
}

function gameOn(){
	background(bg)
    if(bm2playing === false) {
      bm1.stop();
      bm2.play();
    }
    bm2playing = true;
    imageSprite.visible = true;
    imageSprite.scale = 0.1;
    imageSprite.position.x = x;
    imageSprite.position.y = y;
  fill(255, 87, 51);
  text("score = " + score, width / 2 ,height / 2 - 170)
  //ellipse(x,y,20,20)

  rectMode(CENTER)
  image(img, mouseX - 40, 300, 100, 100);
	y+= speed;
  if(y>height){
  	screen =2
  }
  if(y>height-95 && x>mouseX-30 && x<mouseX+30){
  	rustle.play();
    y=-20
    speed+= 0.3
    score+= 1
  }
	if(y==-20){
  	pickRandom();
  }
}

function pickRandom(){
	x= random(20,width-20)
}

function endScreen(){
		background(150);
        if(bm3playing === false) {
          bm2.stop();
          bm3.play();
        }
        bm3playing = true;
        imageSprite.visible = false;
		textAlign(CENTER);
        textSize(width / 22);
		text('GAME OVER', width / 2, height / 2)
        textSize(width/40);
  	    text("SCORE = " + score + " MUSUBI", width / 2, height / 2 + 20)
        fill(50);
		text('click to play again', width / 2, height / 2 + 70);
}

function mousePressed(){
	if(screen==0){
  	screen=1
      bm1playing = false;
  }else if(screen==2){
  	screen=0
    bm2playing = false;
    bm3playing = false;
  }
}

function reset(){
	  score=0;
  	speed=2;
  	y=-20;
}
