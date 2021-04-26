var PLAY=1
var END=0
var gameState=1
var boy,mask,covid,sanitizer,road,gameover,restart
var score=0

function preload(){
roadImage=loadImage("Road.png")
boyImage=loadAnimation("Runner-1.png","Runner-2.png")
boyImages=loadAnimation("Runner-1.png")
maskImage=loadImage("mask.png")
covidImage=loadImage("covid.png")
sanitizerImage=loadImage("sanitizer.png")
restartImage=loadImage("restart.jpg")
gameoverImage=loadImage("gameeover.png")
}








function setup(){
    createCanvas(600,800)
road=createSprite(300,300 )
boy=createSprite(70,750,20,20)
boy.addAnimation("running",boyImage)
boy.addAnimation("standing",boyImages)
road.addImage(roadImage)
boy.scale=0.08
road.scale=0.5
road.velocityY=8
masksGroup=new Group()
covidsGroup=new Group()
sanitizersGroup=new Group()
gameover=createSprite(300,300)
gameover.addImage(gameoverImage)
gameover.visible=false
gameover.scale=0.5
restart=createSprite(300,400)
restart.addImage(restartImage)
restart.visible=false
restart.scale=0.2
}

function draw(){
    background(0)
    if(gameState===PLAY){
        gameover.visible=false
        restart.visible=false
        boy.changeAnimation("running",boyImage)
    boy.x=mouseX
createMask()
createCovid()
createSanitizer()
if(road.y>600){
    road.y=height/2
}
road.velocityY=8
if(masksGroup.isTouching(boy)){
    masksGroup.destroyEach()
    score=score+5
}
else if(sanitizersGroup.isTouching(boy)){
    sanitizersGroup.destroyEach()
    score=score+4

}
else if(covidsGroup.isTouching(boy)){
    covidsGroup.destroyEach()
    score=score-6
}
    }
    if(score>100){
    gameState=END
    gameover.visible=true
    restart.visible=true
   // textSize(20)
   // fill("lightblue")
   // text("PREES SPACE TO RESTART",200,550)
    boy.changeAnimation("standing",boyImages)
    masksGroup.destroyEach()
    covidsGroup.destroyEach()
    sanitizersGroup.destroyEach()
    masksGroup.setVelocityYEach(0)
    covidsGroup.setVelocityYEach(0)
    sanitizersGroup.setVelocityYEach(0)
    road.velocityY=0
    if(mousePressedOver(restart)) {
        reset();
      }
   
    }

drawSprites()
fill("white")
textSize(20)
text("score- "+score,450,30)
    
}
function createMask(){
    if(frameCount%200==0){
    mask=createSprite(Math.round(random(80,500),40,10,10))
    mask.addImage(maskImage)
    mask.scale=0.08
    mask.velocityY=8
    mask.lifetime=200
    masksGroup.add(mask)
    }
}
function reset(){
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    
    covidsGroup.destroyEach();
    masksGroup.destroyEach();
    sanitizersGroup.destroyEach();
    score = 0;
  }
function createCovid(){
    if(frameCount%350==0){
    covid=createSprite(Math.round(random(80,500),40,10,10))
    covid.addImage(covidImage)
    covid.scale=0.09
    covid.velocityY=8
    covid.lifetime=200
    covidsGroup.add(covid)
    }
}

function createSanitizer(){
    if(frameCount%450==0){
    sanitizer=createSprite(Math.round(random(80,500),40,10,10))
    sanitizer.addImage(sanitizerImage)
    sanitizer.scale=0.2
    sanitizer.velocityY=8
    sanitizer.lifetime=200
    sanitizersGroup.add(sanitizer)
}
}