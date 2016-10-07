
import particle from './astate'
import utils from './utils'
import io from 'socket.io-client'
import PIXI from 'pixi.js'
import listM from './listManager'

const socket = io('http://5.196.7.169:3030')


/* Global var Init */
let	b = document.getElementById("searchButton"),
	nbPart = document.getElementById("nbPart"),
	nbTweet = document.getElementById("nbTweet"),
	width  = window.innerWidth,
	height  = window.innerHeight,
	tweetCounter = 0;
	listM.create('tweetList');

/* PIXI INIT */
let stage =  new PIXI.Container(),
renderer = PIXI.autoDetectRenderer(width, height,
	{antialias: false, transparent: true, resolution: 1}
);
document.body.appendChild(renderer.view)

window.onload = function() {

	PIXI.loader
	.add("./assets/sun.png")
	.add("./assets/pSprite.png")
	.load(setup);

	/* PARTICLE INIT WITH 2 SUN */

	var sun1 = particle.create(300, 150, 0, 0),
	sun2 = particle.create(800, 600, 0, 0),
	emitter = {
		x: 100,
		y: -50
	},
	particles = [],
	maxParticle = 500,
	numParticles = 0;
  sun1.mass = 10000;
	sun1.radius = 10;
	sun2.mass = 20000;
	sun2.radius = 20;


	function setup() {
	  var sprite = new PIXI.Sprite(
	    PIXI.loader.resources["./assets/sun.png"].texture
	  );
		interactiveSprite(sun1,'./assets/sun.png');
		interactiveSprite(sun2,'./assets/sun.png');
	}

	function interactiveSprite(sun , path){
		sun.sprite = PIXI.Sprite.fromImage('./assets/sun.png');
		sun.sprite.anchor.x = 0.5;
		sun.sprite.anchor.y = 0.5;
		sun.sprite.x = sun.x;
		sun.sprite.y = sun.y ;
		sun.sprite.interactive = true;
		sun.sprite.on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
		stage.addChild(sun.sprite);
	}
	function onDown (eventData) {
	    this.x = eventData.data.originalEvent.movementX;
	    this.y = eventData.data.originalEvent.movementY;
	}
	function onDragStart(event){
    this.data = event.data;
    this.alpha = 0.8;
    this.dragging = true;
	}
	function onDragEnd(){
	  this.alpha = 1;
		this.dragging = false;
		this.data = null;
	}
	function onDragMove(){
		if (this.dragging){
			var newPosition = this.data.getLocalPosition(this.parent);
			this.position.x = newPosition.x;
			this.position.y = newPosition.y;
			moveSun(newPosition.x,newPosition.y);
		}
	}
	function moveSun(x,y){
		if(sun1.sprite.dragging){
			sun1.x = x;
			sun1.y = y;
		}else{
			sun2.x = x;
			sun2.y = y;
		}
	}

	function pushParticle (nP){
		for(var i = 0; i <nP; i += 1) {
			var p = particle.create(emitter.x, emitter.y, utils.randomRange(7, 8), Math.PI / 2 + utils.randomRange(-0.1, 0.1));
			p.addGravitation(sun1);
			p.addGravitation(sun2);
			p.radius = 3;
			p.sprite = PIXI.Sprite.fromImage('./assets/pSprite.png');
			p.sprite.x = p.x;
			p.sprite.y = p.y;
			stage.addChild(p.sprite);
			particles.push(p);
		}
	}
	function update() {

		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			p.update();
			draw(p);
			if(p.x > width ||
				p.x < 0 ||
				p.y > height ||
				p.y < -50) {

				/*
				/ UnComment to conserve Particle
				p.x = emitter.x;
				p.y = emitter.y;
				p.setSpeed(utils.randomRange(7, 8));
				p.setHeading(Math.PI / 2 + utils.randomRange(-.1, .1));*/

				p.sprite.destroy();
				particles.splice(i, 1);
				numParticles --;
			}
		}
		if(sun1.sprite){

		}
		renderer.render(stage);
		requestAnimationFrame(update);
	}
		update();
	function draw(p) {
		p.sprite.x = p.x;
		p.sprite.y = p.y;
	}

	b.onclick = function(){
		 let filter = document.getElementById('inputTweet').value
		 if(filter.length>3){
			 socket.emit('getTweet',filter)
			 var over = document.getElementById('searchOverlay')
			 utils.fadeOut(over);
			 console.log("Start searching : " + filter);
		 }else{
			 var error = document.getElementById('errorInput');
			 error.innerHTML = ' Filter is too short  !'
			 console.log("Filter not enough long  : " + filter);
		 }
		 let dataIn = document.getElementById('data');
		 utils.fadeIn(dataIn);
	 }
	 socket.on('connect', function(){
	   console.log('yo from server');
	 });

	 socket.on('newTweet',function (data) {
		tweetCounter ++;
	 	listM.pushTweet(data.name, data.screenName, data.content);
		listM.display();
		if(numParticles < maxParticle){
				numParticles += data.content.length;
		}
		pushParticle(numParticles);
		nbPart.innerHTML = numParticles;
		nbTweet.innerHTML = tweetCounter;
	 })
}
window.onresize = function (event){
	width  = window.innerWidth,
 	height  = window.innerHeight;

	renderer.view.style.width = width + "px";
	renderer.view.style.height = height + "px";

 	renderer.resize(width,height);
}
