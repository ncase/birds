/******

Two canvasses:
- All within a 1000x600 area
- The top graph is 600x300
- The birds & pigs are 1000x300.
- The velocity & sizes right now are good. (maybe double the size...)

*****/

Math.TAU = Math.PI*2;

var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');

var gcanvas = document.getElementById("graph");
var gctx = gcanvas.getContext('2d');

var arrowImage = new Image();
arrowImage.src = "arrow.png";

var birdImage = new Image();
birdImage.src = "bird.png";

var birds = [];

function newBird(angle){
	angle = (angle===undefined) ? Math.random()*Math.PI : angle;
	return {
		x:500,
		y:300,
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
	if(canvasY>300) canvasY=300;
	var x = canvasX-500;
	var y = -(canvasY-300);
	var angle = Math.atan2(y,x);

	offsetY = 50;

	var bird = newBird(angle);
	birds.push(bird);
	plotBird(bird);
}

var graphBirds = [];
function plotBird(bird){
	graphBirds.push(bird);
}

var RAF = window.requestAnimationFrame;
var offsetY = 0;
function draw(){

	ctx.clearRect(0,0,1000,300);

	// DRAW ARROW
	ctx.save();
	ctx.translate(500,300);
	var dx = (Mouse.x-canvas.offsetLeft) - 500;
	var dy = (Mouse.y-canvas.offsetTop) - 300;
	if(dy>0) dy=0;
	var angle = Math.atan2(dy,dx);
	var arrowAngle = angle;
	ctx.rotate(angle);
	ctx.drawImage(arrowImage,-30,-30,200,60);
	ctx.restore();

	// DRAW ARROW'S BIRD
	ctx.save();
	ctx.translate(500,300+offsetY);
	offsetY = offsetY*0.9;
	ctx.rotate(angle);
	if(dx<0){
		ctx.scale(1,-1);
	}
	ctx.drawImage(birdImage,-25,-25,50,50);
	ctx.restore();

	// DRAW BIRDS
	for(var i=0;i<birds.length;i++){

		var bird = birds[i];
		
		// UPDATE
		bird.x += bird.vel.x;
		bird.y += bird.vel.y;
		bird.vel.y += 0.5;

		// DRAW
		ctx.save();
		ctx.translate(bird.x,bird.y);
		var angle = Math.atan2(bird.vel.y,bird.vel.x);
		ctx.rotate(angle);
		if(bird.vel.x<0){
			ctx.scale(1,-1);
		}
		var mag = Math.sqrt(bird.vel.x*bird.vel.x + bird.vel.y*bird.vel.y)*0.1;
		if(mag<1) mag=1;
		ctx.scale(mag,1/mag);
		ctx.drawImage(birdImage,-25,-25,50,50);
		ctx.restore();

		// KILL
		if(bird.y>300){
			birds.splice(i,1);
		}
	}

	// DRAW GRAPH
	gctx.clearRect(0,0,600,300);
	gctx.strokeStyle = "#888";
	gctx.lineWidth = 2;
	gctx.beginPath();
	gctx.moveTo(0,150);
	gctx.lineTo(600,150);
	gctx.stroke();

	// DRAW GRAPH ANGLE
	gctx.fillStyle = "rgba(226,72,72,0.25)";
	if(arrowAngle>=Math.PI) arrowAngle-=Math.TAU;
	var angleBarWidth = -(arrowAngle/Math.PI)*600;
	gctx.fillRect(0,0, angleBarWidth, 300);

	// DRAW GRAPH BIRDS
	gctx.save();
	gctx.translate(0,300/2);
	gctx.fillStyle = "#E24848";
	
	gctx.beginPath();
	gctx.arc(angleBarWidth, 0, 5, 0, Math.TAU, false);
	gctx.fill();

	for(var i=0;i<graphBirds.length;i++){
		var gb = graphBirds[i];
		var gbx = (gb.angle/Math.PI)*600;
		var gby = -((gb.x-500)/500)*300/2;
		gctx.beginPath();
		gctx.arc(gbx, gby, 5, 0, Math.TAU, false);
		gctx.fill();
	}
	gctx.restore();

	RAF(draw);
}
draw();