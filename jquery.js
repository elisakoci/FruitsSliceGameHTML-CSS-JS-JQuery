var playing= false;
var score;
var trialsLeft;
var step;
var action;//used for setInterval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function(){


//click on start button
$("#startreset").click(function(){
	//	are we palying?
	if(playing== true){
		//yes
		//reload page
		location.reload();
	}else{
		//no
		playing = true;//game initiated
		//set sore to 0
		score = 0;//set score to 0
		$("#scorevalue").html(score);
		//show trials left
		$("#trialsLeft").show();
		trialsLeft  = 3;
		addHearts();

		//hide game over box
		$("#gameOver").hide();

		//change button text to "reset game"
		$("#startreset").html("Reset Game");
		//start sending fruits
		startAction();
	}
});




		

//slice a fruit
$("#fruit1").mouseover(function(){
	score ++;
	$("#scorevalue").html(score);//update score
	//document.getElementById("slicesound").play();
	$("#slicesound")[0].play();//play sound

	//stop fruit and hide
	clearInterval(action);

	//hide fruit
	$("#fruit1").hide("explode", 500);//slice fruit

	//send new fruit
	setTimeout(startAction, 500);
});



function addHearts(){
	$("#trialsLeft").empty();
	for(i=0; i< trialsLeft; i++){
	$("#trialsLeft").append('<img src="images/zz.png" class= "life" >');
	}
}
//1.create random fruit
function startAction(){
//generate a fruit
$("#fruit1").show();
chooseFruit();//choose a random fruit
$("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
//define a random step
step = 1 + Math.round(5*Math.random());//change step
//Move fruit down by one step every 10 ms
action = setInterval(function(){
	$("#fruit1").css('top', $("#fruit1").position().top + step);//move to fruit by one step
	
	//move fruit by one step 
	$("#fruit1").css('top', $("#fruit1").position().top + step);

	//check if the fruit is too low
	if($("#fruit1").position().top > $("#fruitsContainer").height()){
		//check if we have trials left 
		if(trialsLeft > 1){
			//generate a fruit
			$("#fruit1").show();
			chooseFruit();//choose a random fruit
			$("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
			//define a random step
			step = 1 + Math.round(5*Math.random());//change step

			//reduce trials by one
			trialsLeft --;

			//populate trialsleft box
			addHearts();
		}else{ //game over
			playing = false;// we are not playing anymore
			$("#startreset").html("Start Game");//change button to staRT Game
			$("#gameOver").show();
			$("#gameOver").html('<p>Game Over!</p> <p>Your score is ' + score+ '</p>');
			$("#trialsLeft").hide();
			stopAction();
		}
	}
}, 20);
}

//define the function that generate a random fruit
function chooseFruit(){
	$("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png');//random position
}
//stop dropping fruits
function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();
}

});