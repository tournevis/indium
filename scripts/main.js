
import particle from './astate'
import utils from './utils'
import io from 'socket.io-client'
import PIXI from 'pixi.js'
import listM from './listManager'

const socket = io('http://5.196.7.169:3030')
//console.log(astate);
console.log(utils);
window.onload = function() {
	 let	b = document.getElementById("searchButton"),
		width  = window.innerWidth,
		height  = window.innerHeight;

	/* PIXI INIT */

		var stage =  new PIXI.Container(),
		//graphics = new PIXI.Graphics(),
		renderer = PIXI.autoDetectRenderer(width, height,
			{antialias: false, transparent: true, resolution: 1}
		);
		document.body.appendChild(renderer.view)

		PIXI.loader
		.add("./assets/sun.png")
		.add("./assets/pSprite.png")
		.load(setup);

	// create a renderer instance.



		var sun1 = particle.create(300, 150, 0, 0),
		sun2 = particle.create(800, 600, 0, 0),
		emitter = {
			x: 100,
			y: 0
		},

		particles = [],
		numParticles = 0;
    sun1.mass = 10000;
		sun1.radius = 10;
		sun2.mass = 20000;
		sun2.radius = 20;
  //context.font = "48px serif";
	function setup() {
	  var sprite = new PIXI.Sprite(
	    PIXI.loader.resources["./assets/sun.png"].texture
	  );
		sun1.sprite = PIXI.Sprite.fromImage('./assets/sun.png');
		sun1.sprite.x = sun1.x - 50;
		sun1.sprite.y = sun1.y - 50
		stage.addChild(sun1.sprite);
		sun2.sprite = PIXI.Sprite.fromImage('./assets/sun.png');
		sun2.sprite.x = sun2.x - 50;
		sun2.sprite.y = sun2.y - 50
		stage.addChild(sun2.sprite);
	}


	listM.create('tweetList');
	update();
	  // Crée un nouvel objet Image



	function update() {
    /*context.fillStyle = 'rgba(255, 255, 255, 0.5)';
		context.fillRect(0, 0, width, height);*/
  //  context.clearRect(0, 0, width, height);

		//draw(sun1, "white");
		//draw(sun2, "yellow");
		//context.drawImage(document.getElementById('sun'), sun1.x-50, sun1.y-50);
		//ontext.drawImage(document.getElementById('sun'), sun2.x-50, sun2.y-50);

		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			p.update();
			draw(p, 'rgba(255, 255, 255, 0.5)');
			if(p.x > width ||
				p.x < 0 ||
				p.y > height ||
				p.y < 0) {
				p.x = emitter.x;
				p.y = emitter.y;
				p.setSpeed(utils.randomRange(7, 8));
				p.setHeading(Math.PI / 2 + utils.randomRange(-.1, .1));

			}
		}
		renderer.render(stage);
		//numParticles --;
		requestAnimationFrame(update);
	}

	function draw(p, color) {

	 //var pSprite = PIXI.Sprite.fromImage('./assets/pSprite.png');
		p.sprite.x = p.x;
		p.sprite.y = p.y;
		//stage.addChild(pSprite);

	/*	context.fillStyle = color;
		context.beginPath();
		context.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
  //  context.fillText(p.letter, p.x,p.y);
		context.fill();*/
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
	 }
	 socket.on('connect', function(){
	   console.log('yo');
	 });
	 socket.on('newTweet',function (data) {
	 	console.log(data);
	 	listM.pushTweet(data.name, data.screenName, data.content)
	 	numParticles += 1;
		for(var i = 0; i < numParticles; i += 1) {
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

	 	listM.display();
	 })
}
