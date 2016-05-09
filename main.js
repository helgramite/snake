
function setup(){
  var  CANVAS_WIDTH = 400;
  var  CANVAS_HEIGHT = 400;
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}


var snakeBody = [
    {x:200,y:200}
  ];
  var snakeHead = {x:200, y:200};
  var food = {x:100, y:200};


  var score = 0;
  var timer = 0;

var speed = 40;
var hSpeed = 0;
var vSpeed = 0;
var pee = 0.5;
var random = function(min,max){

  var r = Math.random()
  return r * (max - min) + min;

}
var head = function(position){
    var headX = position.x;
    var headY = position.y;
    rect(headX,headY,40,40);
    ellipse(headX + 20,headY + 20,10,10);

};
var foodDraw = function(position){
   var foodX = position.x-5;
   var foodY = position.y-5;

   rect(foodX,foodY,10,10);
};





var drawGrid = function(){
    // grid // problem
    for(var c = 0; c === 10; c++){
        var x = c *40;
        var y = c *40;

        line(0,y,400,y);
        line(x,0,x,400);
    }

};
var time = function(){
    timer++;
    if(timer >= 11){
        timer = 0;
        score += pee;
    }
};
var drawSnake =function(){

    fill(109, 219, 72);
    // head(snakeBody[1]);//problem wont move same issue
    for(var i = snakeBody.length-1; i >0;i--){
        head(snakeBody[i]);}
    head(snakeBody[0]);
    head(snakeHead);
};
var foodStuff = function(){
    if( food.x <= snakeHead.x + 45 && food.x >= snakeHead.x-5 && food.y <= snakeHead.y + 45 && food.y >= snakeHead.y-5){

          food.x = Math.round(random(1,9))*40;
          food.y = Math.round(random(1,9))*40;
          snakeBody.push({x:500,y:500});
          score +=100;
      }
};
var movement = function(){
    if(timer === 10){
        for(var p= snakeBody.length - 1;p > 0; p--){

            snakeBody[p].x = snakeBody[p-1].x;
            snakeBody[p].y = snakeBody[p-1].y ;//problem wont move
        }

        snakeBody[0].x = snakeHead.x;
        snakeBody[0].y = snakeHead.y;

        snakeHead.x += hSpeed;
        snakeHead.y += vSpeed;
    }
};

var scoring = function(){
    stroke(0, 0, 0);
    text("score " + score ,328,20,100,20);
};
var player = function(){
    if( keyIsPressed && keyCode === RIGHT_ARROW && hSpeed!== -40 ){
        hSpeed = speed;
        vSpeed = 0;
    }
    if( keyIsPressed && keyCode === LEFT_ARROW && hSpeed!== 40 ){
        hSpeed = -speed;
        vSpeed = 0;
    }
    if( keyIsPressed && keyCode === DOWN_ARROW && vSpeed!== -40 ){
        hSpeed = 0;
        vSpeed = speed;
    }
    if( keyIsPressed && keyCode === UP_ARROW && vSpeed!== 40 ){
        hSpeed = 0;
        vSpeed = -speed;
    }
};

var losing = function(){

    for(var i = snakeBody.length-1; i > 0; i--){
    if (snakeHead.x >= snakeBody[i].x && snakeHead.x <= snakeBody[i].x+5 && snakeHead.y >= snakeBody[i].y && snakeHead.y <= snakeBody[i].y+ 5  ){
        background(0, 0, 0);
        pee = 0;
        vSpeed = 0;
        hSpeed = 0;
        speed = 0;
        text("YOU TOUCHED YOURSELF" ,snakeHead.x-20,snakeHead.y- 20,200,200);
    }
    }
    if( snakeHead.x > 400 || snakeHead.x < 0||snakeHead.y > 400||snakeHead.y < 0){
      background(0, 0, 0);
      pee = 0;
      vSpeed = 0;
      hSpeed = 0;
      speed = 0;
      text("WHAT DID YOU DO?!" ,160,200,200,200);
    }

};




// gamespace
draw = function() {
    background(50, 255, 255);
     losing();
    drawGrid();
    //score keeping
   scoring();
    //time keeping
    time();


    // input
    player();


    //movement
    movement();
    //draw snake
    drawSnake();

     //food stuff
    foodStuff();
    fill(255, 0, 0);
    foodDraw(food);



};
