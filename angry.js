var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');

var bird;
function newBird(angle){
	angle = (angle===undefined) ? Math.random()*Math.PI : angle;
	bird = {
		x:500,
		y:600,
		vel:{
			x:Math.cos(angle)*15,
			y:-Math.sin(angle)*15
		},
		angle:angle
	};
}

window.onclick = function(e){

	var canvasX = e.clientX - canvas.offsetLeft;
	var canvasY = e.clientY - canvas.offsetTop;
	if(canvasY>600) canvasY=600;
	var x = canvasX-500;
	var y = -(canvasY-600);
	var angle = Math.atan2(y,x);

	newBird(angle);
}

function plotBird(bird){

	var gWidth = 600;
	var gHeight = 300;

	ctx.save();
	ctx.translate((1000-gWidth)/2,gHeight/2);
	ctx.translate((bird.angle/Math.PI)*gWidth, -((bird.x-500)/500)*gHeight/2);
	ctx.fillStyle = "#000";
	ctx.fillRect(-5,-5,10,10);
	ctx.restore();
}

var RAF = window.requestAnimationFrame;
function draw(){

	if(bird && bird.y<=600){
		ctx.fillStyle = "#CC2727";
		ctx.fillRect(bird.x-10,bird.y-10,20,20);

		bird.x += bird.vel.x;
		bird.y += bird.vel.y;
		bird.vel.y += 0.5;

		if(bird.y>600){
			plotBird(bird);
		}
	}

	RAF(draw);
}
draw();