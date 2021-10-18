var path,boy,cash,diamonds,jewelry,sword, gameOver;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg, gameOverImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var rand;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
  
  
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 10;


//creating boy running
boy = createSprite(70,550,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.setCollider("circle", 0, 0, 700);
  
  
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();

gameOver = createSprite(200, 200, 100, 50);
gameOver.addImage("gameOver", gameOverImg);


}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  gameOver.visible = false;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 800 ){
    path.y = height/2;
  }
  
  //code to create items
  if(frameCount%60==0){
    rand = Math.round(random(1, 3));

    switch(rand){
      case 1:
        createCash();
        break;
      case 2:
        createDiamonds();
        break;
      case 3:
        createjewelry();
        break;
      default:
        break;
    }

    
  }

  createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jewelryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
        
        gameOver.visible = true;
    }
  }
  
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,10,30);
  }

}

function createCash() {

  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 10;
  cash.lifetime = 150;
  cashG.add(cash);

}

function createDiamonds() {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 10;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}

function createjewelry() {
  var jewelry = createSprite(Math.round(random(50, 350),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.13;
  jewelry.velocityY = 10;
  jewelry.lifetime = 150;
  jewelryG.add(jewelry);
}

function createSword(){
  if (World.frameCount % 80 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 12;
  sword.lifetime = 150;
  swordGroup.add(sword);
  
  }
}
