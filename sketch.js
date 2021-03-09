var bg;
var oasis, desert, plains, swamp;
var knight, knightImg, dragon, dragonImg;
var ground;
var apple, date, dragonfruit;
var fruitImage;
var sprite, applesGroup, appleCollect; 
var score = 0;
var floorType;
var PLAY = 0;
var END = 1;
var WIN = 2;
var gameState = PLAY;
var castle, castleImage;
var wall, wall2;
var scoreIncrease;


function preload(){
    loadBgImages();
    loadPlatformImages();
    knightImg = loadImage("Knight.png");
    dragonImg = loadImage("dragon.png");
    apple = loadImage("apple.png");
    date = loadImage("date.png");
    dragonfruit = loadImage("dragonfruit.png");
    appleCollect = loadSound("sound_effect.mp4");
    castleImage = loadImage("castle.png");
    
}

function setup() {
    createCanvas(1400, 800);

    //knight
    knight = createSprite(200, 650);
    knight.addImage(knightImg);
    knight.setCollider("rectangle", 0,0, 200,200);
    knight.scale = 0.6;

    //dragon
    dragon = createSprite(150, 200);
    dragon.addImage(dragonImg);
    dragon.scale = 0.6;

    //ground
    ground = createSprite(700, 780, 1400, 20);
    wall = createSprite(120, 400, 20, 800);
    wall2 = createSprite(1400, 400, 20, 800);

    //castle
    castle = createSprite(1000, 600);
    castle.addImage(castleImage);
    castle.visible = false;
    castle.setCollider("rectangle", 0,0, 200,200);


    //Group
   // applesGroup = new Group();

    applesGroup = createGroup();
    floorGroup = createGroup();
    
    fruitImage = apple;
}

function draw() {
    chooseBackground();
    chooseFruit();
    background(bg);
    knight.collide(ground);
    knight.collide(wall);
    ground.visible = false;
    wall.visible = false;
    knight.collide(wall2);
    wall2.visible = false;

    if(keyDown(UP_ARROW) && knight.y >= 600){
        knight.velocityY = -18;
    }
    if(keyDown(DOWN_ARROW)){
        knight.velocityY = 10;
    }
    if(keyDown(LEFT_ARROW) && knight.y >= 600){
        knight.velocityX = -8;
    }
    if(keyDown(RIGHT_ARROW)){
        knight.velocityX = 5;
    }
    knight.velocityY += 1;
    knight.velocityX += -0.3;
    
    if(gameState === PLAY) {
        apples();
        textSize(20);
        textStyle(BOLD);
        fill("green");
        text("Score : " + score, 600, 400);
        
        if(frameCount === 4900) {
            castle.visible = true;
        }

        if(knight.isTouching(castle) && castle.visible === true) {
            gameState = WIN;
        }

        if(applesGroup.isTouching(knight)){
        
            //applesGroup.remove(sprite);
            //applesGroup.destroyEach();
            applesGroup.get(0).destroy();
            score += scoreIncrease;
            appleCollect.play();
        
            //console.log("TOUCHING.." + applesGroup.size());
        }
        if(floorGroup.isTouching(knight)){
            gameState = END;
        }
        floors();
        drawSprites();
    }

    if(gameState === END) {
        background("black");
        textSize(60);
        fill("red");
        text("GAME OVER", 600, 400);
    }

    if(gameState === WIN) {
        background("yellow");
        textSize(60);
        fill("black");
        text("Congrats on winning!", 550, 400);
    }
    
}

function chooseBackground() {
    if(frameCount <= 1000) {
        bg = plains;
        floorType = plainsFloor;
    }
    if(frameCount <= 2000 && frameCount > 1000) {
        bg = desert;
        floorType = desertFloor;
    }
    if(frameCount <= 2500 && frameCount > 2000) {
        bg = oasis;
        floorType = desertFloor;
    }
    if(frameCount <= 3000 && frameCount > 2500) {
        bg = desert;
        floorType = desertFloor;
    }
    if(frameCount <= 4000 && frameCount > 3000) {
        bg = swamp;
        floorType = swampFloor;
    }
    if(frameCount <= 5000 && frameCount > 4000) {
        bg = plains;
        floorType = plainsFloor;
        
    }
}

function chooseFruit() {
    if(frameCount <= 1000) {
        fruitImage = apple;
        scoreIncrease = 100;
    }
    if(frameCount <= 2000 && frameCount > 1000) {
        fruitImage = date;
        scoreIncrease = 200;
    }
    if(frameCount <= 2500 && frameCount > 2000) {
        fruitImage = date;
        scoreIncrease = 200;
    }
    if(frameCount <= 3000 && frameCount > 2500) {
        fruitImage = date;
        scoreIncrease = 200;
    }
    if(frameCount <= 4000 && frameCount > 3000) {
        fruitImage = dragonfruit;
        scoreIncrease = 300;
    }
    if(frameCount <= 5000 && frameCount > 4000) {
        fruitImage = apple;
        scoreIncrease = 400;
    }
}

function loadBgImages() {
    oasis = loadImage("oasis.jpg");
    print(oasis);
    desert = loadImage("desert.jpg");
    print(desert);
    plains = loadImage("plains.jpg");
    print(plains);
    swamp = loadImage("swamp.jpg");
    print(swamp);
}
function loadPlatformImages() {
    desertFloor = loadImage("desertFloor.png");
    print(desert);
    plainsFloor = loadImage("plainFloor.png");
    print(plains);
    swampFloor = loadImage("swampFloor.png");
    print(swamp);
}

function apples() {
    if(frameCount % 100 === 0) {
        //apple = new Apple();
        sprite = createSprite(1500, random(400, 700));
        sprite.addImage(fruitImage);
        sprite.velocityX = -4;
        sprite.lifetime = 1500;
        sprite.scale = 0.1;
        applesGroup.add(sprite);
        //console.log("added.." + applesGroup.size());

    }

}

function floors() {
    
    if(frameCount % 150 === 0) {
        //apple = new Apple();
        sprite = createSprite(1500, random(400, 700));
        sprite.addImage(floorType);
        sprite.setCollider("rectangle", 0, 10, 200, 10);
        sprite.velocityX = -4;
        sprite.lifetime = 1500;
        sprite.scale = 0.2;
        floorGroup.add(sprite);
        //console.log("added.." + applesGroup.size());

    }

}
