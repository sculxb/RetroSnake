
var table = document.getElementById("snake_home");
var tbody = table.getContext("2d");

//var Height = 40;var Width = 40;
var T = 80; var d = 10;
var snake_i = table.width/d,snake_j = table.height/d;
//console.log(snake_i,snake_j);
var keyCode=37;
var snake = new Array(3);
//var head = snake[0];
var alive = true;
var food = [2,2];

btnStart = document.getElementById("Start");
//    console.log(btnStart);
	init();
	btnStart.onclick = function(e){
		game_clock();
		//alert("start");
	}

function restart() {
	// body...
}

function init(){
    
    snake = [[30,4],[31,4],[32,4]];
	//console.log(snake);
	//console.log(head);
	foodgenerate();
	fps();
} 

document.onkeydown = function(event)
{
	var e = event || window.event;
	var keyCode = e.keyCode || e.which;
	window.keyCode = (Math.abs(e.keyCode-keyCode)!=2)&&(e.keyCode>36)&&(e.keyCode<41)?e.keyCode : keyCode 
  	//alert(keyCode);
  return keyCode;
}

function game_clock(){
	window.int = setInterval('move()',T);
}

function gameover(){
	//alert("Your sore:"+ snake.length-3);
	clearInterval(int);
   	info("Game over~");
}

function fps(){
	var head = snake[snake.length-1];
	tbody.clearRect(0,0,table.width,table.height);
//paint background;	
	tbody.strokeStyle = "black";
	tbody.strokeRect(0,0,table.width,table.height);
//paint snake head	
//	tbody.fillStyle = "red";
//	tbody.fillRect(head[0]*d+1,head[1]*d+1,d-2,d-2);
//paint snake body	
	tbody.fillStyle = "green";
	for(var i =0;i<snake.length;i++){
		var snake_x = snake[i][0]*d;
		var snake_y = snake[i][1]*d;
		//console.log([snake_x,snake_y]);
		tbody.fillRect(snake_x+1 ,snake_y+1, d-2, d-2);
	}
//paint food	
	tbody.fillStyle = "red";
	tbody.fillRect(food_x*d+1,food_y*d+1,d-2,d-2);
	//console.log([food_x*d,food_y*d]);
}

function foodgenerate(){
	food_x=Math.round(Math.random()*(snake_i-1));
	food_y=Math.round(Math.random()*(snake_j-1));
	var food = [food_x,food_y];
	//console.log("food:"+[food_x,food_y]);
	in_array(food,snake);
		if(alive)
		{
			foodgenerate();
		}
		return food;
	}

function move(){
	var snake_head = (snake[0]).slice(0);
	var head = snake_head;
	//console.log(snake);
	//console.log(">>>>>> keyCode");
	//console.log(keyCode);
	switch(keyCode) {
 		case 37:head[0]-=1;break;
 		case 38:head[1]-=1;break;
 		case 39:head[0]+=1;break;
 		case 40:head[1]+=1;break;
	}
	in_array(head, snake);
    	var i = head[0];var j = head[1];
    	if(i>(snake_j-1)||i<0||j>(snake_i-1)||j<0||alive){
     		gameover();
    	}
        else if((i === food_x)&&(j === food_y)){
        	info("yeah!");
        	snake.unshift([i,j]);
        	foodgenerate();
        	//alert("boom!");
        }else{
        	//console.log(">>>>>> snake move cal");
        	//console.log(head);
        	snake.unshift([i,j]);
        		//console.log(head);
        	snake.pop();
        	snake_o = snake.slice(0);
        	console.log([i,j],[food_x,food_y]);
        }
    fps();
}


function in_array(array1,array2) {
     for(i=0;i<array2.length;i++){
		if ((array1[0] == array2[i][0])&&(array1[1] == array2[i][1])) 
		alive = true;
	}
		alive = false;
}

function info(information){
 document.getElementById("score").innerHTML = information;
}

