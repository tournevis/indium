/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _astate = __webpack_require__(2);

	var _astate2 = _interopRequireDefault(_astate);

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_astate2.default);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var astate = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		mass: 1,
		radius: 0,
		bounce: -1,
		friction: 1,
		gravity: 0,
		springs: null,
		gravitations: null,
		letter: "#",

		create: function create(x, y, speed, direction, grav) {
			var obj = Object.create(this);
			obj.x = x;
			obj.y = y;
			obj.vx = Math.cos(direction) * speed;
			obj.vy = Math.sin(direction) * speed;
			obj.gravity = grav || 0;
			obj.springs = [];
			obj.gravitations = [];
			return obj;
		},

		addGravitation: function addGravitation(p) {
			this.removeGravitation(p);
			this.gravitations.push(p);
		},

		removeGravitation: function removeGravitation(p) {
			for (var i = 0; i < this.gravitations.length; i += 1) {
				if (p === this.gravitations[i]) {
					this.gravitations.splice(i, 1);
					return;
				}
			}
		},
		getSpeed: function getSpeed() {
			return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
		},

		setSpeed: function setSpeed(speed) {
			var heading = this.getHeading();
			this.vx = Math.cos(heading) * speed;
			this.vy = Math.sin(heading) * speed;
		},

		getHeading: function getHeading() {
			return Math.atan2(this.vy, this.vx);
		},

		setHeading: function setHeading(heading) {
			var speed = this.getSpeed();
			this.vx = Math.cos(heading) * speed;
			this.vy = Math.sin(heading) * speed;
		},

		accelerate: function accelerate(ax, ay) {
			this.vx += ax;
			this.vy += ay;
		},

		update: function update() {
			this.handleGravitations();
			this.vx *= this.friction;
			this.vy *= this.friction;
			this.vy += this.gravity;
			this.x += this.vx;
			this.y += this.vy;
		},

		handleGravitations: function handleGravitations() {
			for (var i = 0; i < this.gravitations.length; i += 1) {
				this.gravitateTo(this.gravitations[i]);
			}
		},

		angleTo: function angleTo(p2) {
			return Math.atan2(p2.y - this.y, p2.x - this.x);
		},

		distanceTo: function distanceTo(p2) {
			var dx = p2.x - this.x,
			    dy = p2.y - this.y;

			return Math.sqrt(dx * dx + dy * dy);
		},

		gravitateTo: function gravitateTo(p2) {
			var dx = p2.x - this.x,
			    dy = p2.y - this.y,
			    distSQ = dx * dx + dy * dy,
			    dist = Math.sqrt(distSQ),
			    force = p2.mass / distSQ,
			    ax = dx / dist * force,
			    ay = dy / dist * force;

			this.vx += ax;
			this.vy += ay;
		}
	};
	module.export = astate;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	var utils = {};
	module.export = utils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);