var dog, happyDog, dogS ,database, foodS, foodStock, left,x;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  createCanvas(500,500);
  
  dogS = createSprite(200,300,10,10);
  dogS.addImage(dog);
  dogS.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46, 139, 87);
  if(keyWentUp(UP_ARROW)) {
    writeStock(foodS);
    dogS.addImage(happyDog);
    dogS.scale = 0.2;
  } 
  drawSprites();
  textSize(20);
  fill(0);
  stroke(20);
  text("foodRemaing: "+foodS,120,100);
  text("Note press UP_ARROW to feed the dog",80,50);


}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}
