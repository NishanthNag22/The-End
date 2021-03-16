var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver,restart;
var score=0
var highscore=0

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth - 15,displayHeight - 145);
  
  trex = createSprite(50,568,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.7;
  
  ground = createSprite(200,560,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /4;
  ground.velocityX = -10;
  
  invisibleGround = createSprite(200,570,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover=createSprite(displayWidth/2,displayHeight/2-100,20,20);
  gameover.addImage(gameOverImg);
  gameover.visible=false;
  
  restart=createSprite(displayWidth/2,displayHeight/2,20,20);
  restart.addImage(restartImg);
  restart.visible=false;
  
  score = 0;
}

function draw() {
  background(180);
  textSize(35)
  text("Score :" + score, displayWidth-350,80);
  text("HI :" +highscore,displayWidth-150,80);

  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y>=520) {
    trex.velocityY = -20;
  }  
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
     gameState = END; 
    }
  }
   else if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);    
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }    
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(2000,280,40,10);
    cloud.y = Math.round(random(80,400));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -10;
    cloud.lifetime = 300;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(2000,522,10,40);
    obstacle.velocityX = -10;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    obstacle.scale = 1.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}


function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameover.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  if(highscore<score){
    highscore=score;
  }
  score=0;
}