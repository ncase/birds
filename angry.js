/******

Two canvasses:
- All within a 1000x600 area
- The top graph is 600x300
- The birds & pigs are 1000x300.
- The velocity & sizes right now are good. (maybe double the size...)

*****/

Math.TAU = Math.PI*2;

var container = document.getElementById("container");

var canvas = document.getElementById("game");
var ctx = canvas.getContext('2d');

var gcanvas = document.getElementById("graph");
var gctx = gcanvas.getContext('2d');

var arrowImage = document.getElementById("arrow");
var birdImage = document.getElementById("bird");
var pigImage = document.getElementById("pig");
var egg1Image = document.getElementById("egg1");
var egg2Image = document.getElementById("egg2");
var bacon1Image = document.getElementById("bacon1");
var bacon2Image = document.getElementById("bacon2");

window.onload = function(){

	var exploding = [];

	function Exploding(x,y){

		var img;
		if(Math.random()<0.5){
			if(Math.random()<0.5){
				img = egg1Image;
			}else{
				img = egg2Image;
			}
		}else{
			if(Math.random()<0.5){
				img = bacon1Image;
			}else{
				img = bacon2Image;
			}
		}

		var angle = Math.random()*Math.TAU/2;
		var speed = Math.random()*5+5;

		var explode = {
			x: x,
			y: y,
			r: Math.random()*Math.TAU,
			vel: {
				x: Math.cos(angle)*speed,
				y: -Math.sin(angle)*speed,
				r: (Math.random()-0.5)/2
			},
			img: img 
		};
		exploding.push(explode);
		return explode;

	}


	var birds = [];


	var pig = {
		x:-100,
		y:290,
		gotoX:-100
	};
	function movePig(){
		var newX = Math.random()*300+150;
		var flip = (pig.gotoX<500) ? 1 : -1;
		pig.gotoX = flip*newX+500;
	}

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

		var canvasX = e.clientX - canvas.offsetLeft - container.offsetLeft;
		var canvasY = e.clientY - canvas.offsetTop - container.offsetTop;
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

		// ARROW ANGLE
		var dx = (Mouse.x-canvas.offsetLeft-container.offsetLeft) - 500;
		var dy = (Mouse.y-canvas.offsetTop-container.offsetTop) - 300;
		if(dy>0) dy=0;
		var angle = Math.atan2(dy,dx);
		var arrowAngle = angle;

		// DRAW ARROW ANGLE
		ctx.fillStyle = "rgba(226,72,72,0.25)";
		ctx.beginPath();
		ctx.moveTo(500,300);
		ctx.arc(500, 300, 100, 0, arrowAngle, true);
		ctx.lineTo(500,300);
		ctx.fill();

		// DRAW ARROW
		ctx.save();
		ctx.translate(500,300);
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

		// DRAW EXPLODE
		for(var i=0;i<exploding.length;i++){
			var exp = exploding[i];

			// UPDATE
			exp.x += exp.vel.x;
			exp.y += exp.vel.y;
			exp.r += exp.vel.r;
			exp.vel.y += 0.5;

			// DRAW
			ctx.save();
			ctx.translate(exp.x,exp.y);
			ctx.rotate(exp.r);
			ctx.drawImage(exp.img,-25,-25,50,50);
			ctx.restore();

			// KILL
			if(exp.y>350){
				exploding.splice(i,1);
			}

		}

		// DRAW PIG
		if(pig.x!=pig.gotoX){
			if(pig.y>349){
				pig.x = pig.gotoX;
			}else{
				pig.y = pig.y*0.9 + 350*0.1;
			}
		}else{
			pig.y = pig.y*0.9 + 290*0.1;
			if(pig.y<291){
				pig.y=290;
			}
		}
		ctx.drawImage(pigImage, pig.x-25, pig.y-25, 50, 50);

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

				if(pig.y<291 && Math.abs(bird.x-pig.x)<30){
					
					for(var j=0;j<10;j++){
						Exploding( (bird.x+pig.x)/2, 300 );
					}

				}

				birds.splice(i,1);
				movePig();
			}
		}

		// DRAW GRAPH
		gctx.clearRect(0,0,600,300);
		gctx.strokeStyle = "#222";
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

		// DRAW PIG
		gctx.save();
		gctx.translate(0,300/2);

		gctx.fillStyle = "rgba(82,188,90,0.25)";
		var pY = (-(pig.x-500)/500)*150;
		var pHeight = 0;
		if(pig.y<310){
			pHeight = 1 - (pig.y-290)/20;
			pHeight *= 10;
		}
		gctx.fillRect(0,pY-pHeight/2,600,pHeight);

		// DRAW GRAPH BIRDS
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

}