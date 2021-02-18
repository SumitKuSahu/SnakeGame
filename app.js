var gameStart = null,
    gameSpeed = null,
    gameArea = null,
    gameAreaContext = null,
    gameAreaHeight = 0,
    gameAreaWidth = 0,
    playerScore = 0,
    cellwidth = 0,
    snake = null,
    snakeFood = null,
    snakeDirection = null,
    speedsize = 0,
    timer = null;

    function initialize() {
        gameStart =document.querySelector("#gameStart");
        gameSpeed = document.querySelector("#gameSpeed");
        gameArea = document.querySelector("#gameArea");
        gameAreaContext =gameArea.getContext("2d");
        gameAreaHeight = 600;
        gameAreaWidth =400;
        cellwidth =20;
        gameArea.height=gameAreaHeight;
        gameArea.width=gameAreaWidth;


        gameStart.onclick = function() {
            this.disabled=true;
            startgame() 
        }
    }

function startgame() {
    playerScore =0;
    snakeDirection='right';
    speedsize = parseInt(gameSpeed.value);

    if (speedsize>9){
        speedsize=9;

    }
    else if(speedsize<0){
speedsize=1;
    }
snake=[]
snake.push({x:0,y: cellwidth});
createFood()
clearInterval(timer)
timer=setInterval(createGameArea,500/speedsize);
}


function createFood(){
    snakeFood={
        x:Math.round((Math.random()*(gameAreaWidth-cellwidth))/cellwidth),
        y:Math.round((Math.random()*(gameAreaHeight-cellwidth))/cellwidth)
    };
}



function createGameArea(){
 var snakeX=snake[0].x;
 var snakeY=snake[0].y

 gameAreaContext.fillStyle='#FFFFFF'
 gameAreaContext.fillRect(0,0,gameAreaWidth,gameAreaHeight)
 gameAreaContext.strokeStyle='#CCCCCC';
 gameAreaContext.strokeRect(0,0,gameAreaWidth,gameAreaHeight)

 if(snakeDirection=='right')
 {
     snakeX++;
 }else if(snakeDirection=='left'){
     snakeX--
    
 }else if(snakeDirection=='down'){
     snakeY++
 }
 
 else if(snakeDirection=='up'){
     snakeY--
 }
 if(snakeX==1 || 
    snakeX==(gameAreaWidth/cellwidth) ||
    snakeY==-1 ||
    snakeY==(gameAreaHeight/cellwidth)||
    Control(snakeX,snakeY,snake)
    ){
        writeScore()
        clearInterval(timer)
        gameStart.disabled=true;
        return;
    }
    if(snakeX==snakeFood.x && snakeY==snakeFood.y){
     var newHead={x: snakeX,y :snakeY}
     playerScore += speedsize
     createFood();
    }
     else{
         var newHead=snake.pop();
        newHead.x=snakeX;
        newHead.y=snakeY;  

     }
     
    snake.unshift(newHead);
    for(var i=0;i<snake.length;i++){
        createSquare(snake[i].x,snake[i].y)
    }
    createSquare(snakeFood.x,snakeFood.y)
}

function Control(x,y,array) {
    for (var i=0;i<array.length;i++){
        if (array[i].x==x && array[i].y==y) 
            return true
    }
        return false
}


    function writeScore(){

        gameAreaContext.font="50px sans-serif"
        gameAreaContext.fillStyle="#FFF333"
        gameAreaContext.fillText("Score " + playerScore,
        gameAreaWidth/2 - 100,
        gameAreaHeight/2)
    }

    function createSquare(x,y){
        gameAreaContext.fillStyle="#000000"
        gameAreaContext.fillRect(x*cellwidth,y*cellwidth,cellwidth,cellwidth)
    }

    function changeDirection(e) {
        var keys=e.which;
        if(keys=='40'&& snakeDirection!='up')snakeDirection='down'
        else if(keys=='39' && snakeDirection!='left')snakeDirection='right'
        else if(keys=='38' && snakeDirection!='down')snakeDirection='up'
        else if(keys=='37'&& snakeDirection!='right')snakeDirection='left'

    }

    window.onkeydown=changeDirection;
    window.onload=initialize