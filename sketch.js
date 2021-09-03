//Create variables here
var dog, happydog, database, foodS, foodStock

function preload()
{
	//load images here 
  dogImg = loadImage('images/dogImg.png')
  dogImg1 = loadImage('images/dogImg1.png')
}

function setup() {
	createCanvas(1000,1400);
  database = firebase.database()
  dog = createSprite(250,300,150,150)
  dog.addImage(dogImg)
  dog.scale = 0.25
  foodStock = database.ref('Food')
  foodStock.on('value',readstock)
  foodObject = new Food()
  feed = createButton('feedthedog')
  feed.position(700,95)
  feed.mousePressed(feedog)
  addFood = createButton('addfood')
  addFood.position(800,95)
  addFood.mousePressed(addfoods)
}


function draw() {  
  background(46,139,87);
  foodObject.display()
  fedTime=database.ref('FeedTime'); fedTime.on("value",function(data){ lastFed=data.val(); });
  fill(255,255,254); textSize(15); if(lastFed>=12){ text("Last Feed : "+ lastFed%12 + " PM", 350,30); }
  else if(lastFed==0){ text("Last Feed : 12 AM",350,30); }else{ text("Last Feed : "+ lastFed + " AM", 350,30); }
  drawSprites();
}

function readstock(data){
  foodS = data.val()
  foodObject.updateFoodStock(foodS)
}


function addfoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function feedog(){
  dog.addImage(dogImg1)
  if(foodObject.getFoodStock()<= 0){ foodObject.updateFoodStock(foodObject.getFoodStock()*0); }
  else{ foodObject.updateFoodStock(foodObject.getFoodStock()-1); } database.ref('/').update({ Food:foodObject.getFoodStock(), FeedTime:hour() })
}


