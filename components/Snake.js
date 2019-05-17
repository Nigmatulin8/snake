import Game from './Game.js';

const dQs = val => {
	return document.querySelector(val);
}

export default class Snake extends Game {
	constructor() {
		super();
		this.snake = [
			{
				posX: 27,
				posY: 28
			},
			{
				posX: 26,
				posY: 28
			},
			{
				posX: 25,
				posY: 28
			},
			{
				posX: 24,
				posY: 28
			},
			{
				posX: 23,
				posY: 28
			}
		],
		this.interval = null,
		this.snakeOldHead = {},
		this.direction = {
			currentDirect: null,
			prevDirect: null
		},
		this.moveSpeed = 150
	}

	drawSnake() {
		for(let i = 0; i < this.snake.length; i++) {
			let head = dQs(`[posX = "${this.snake[i].posX}"][posY = "${this.snake[i].posY}"]`);
			if (i === 0) {
				head.classList.add('snakeHead');

				// if(this.direction.currentDirect === 37) {
				// 	head.style.backgroundImage = "url('../img/snakehead-left.png')";
				// }
				// if(this.direction.currentDirect === 38) {
				// 	head.style.backgroundImage = "url('../img/snakehead-up.png')";
				// }
				// if(this.direction.currentDirect === 39) {
				// 	head.style.backgroundImage = "url('../img/snakehead-right.png')";
				// }
				// if(this.direction.currentDirect === 40) {
				// 	head.style.backgroundImage = "url('../img/snakehead-down.png')";
				// }

			}
			else {
				head.classList.add('snakeBody');
			}
		}
	}

	move(direct) {
		//The first snake does not eat itself
		if(direct.keyCode === 37 && this.direction.prevDirect === null) { return; }

		this.direction.currentDirect = direct.keyCode;

		if(wayCheck(this.direction)) {
			this.direction.currentDirect = this.direction.prevDirect;
		}

		if(this.direction.currentDirect > 36 && this.direction.currentDirect < 41) {
			clearInterval(this.interval);

			this.interval = setInterval(() => {
				//End game checking
				if(this.snake[0].posY === 52 || this.snake[0].posX === 52 ||
					this.snake[0].posY === 1 || this.snake[0].posX === 1 ||
					dQs(`[posX = "${this.snake[0].posX}"][posY = "${this.snake[0].posY}"]`).classList.contains('snakeBody')) {
					clearInterval(this.interval);
					super.endGame();
					return;
				}

				if(this.direction.currentDirect === 37) {
					//Saving current snake head's coords;
					Object.assign(this.snakeOldHead, this.snake[0]);

					this.snake[0].posX--;
					this._coords_and_eat();
				}
				else if(this.direction.currentDirect === 38) {
					Object.assign(this.snakeOldHead, this.snake[0]);
					this.snake[0].posY++;
					this._coords_and_eat();
				}
				else if(this.direction.currentDirect === 39) {
					Object.assign(this.snakeOldHead, this.snake[0]);
					this.snake[0].posX++;
					this._coords_and_eat();
				}
				else if(this.direction.currentDirect === 40) {
					Object.assign(this.snakeOldHead, this.snake[0]);
					this.snake[0].posY--;
					this._coords_and_eat();
				}
			}, this.moveSpeed);
		}
	}

	_updateCoords(oldHeadPos) {
		//Snake head removal;
		dQs(`[posX = "${oldHeadPos.posX}"][posY = "${oldHeadPos.posY}"]`).classList.remove('snakeHead');

		//Creating an array copy;
		let newArr = JSON.parse(JSON.stringify(this.snake));

		for(let i = 0; i < this.snake.length - 1; i++) {
			//Updating snake head coords;
			if(i === 0) { Object.assign(this.snake[i + 1], oldHeadPos); }
			else {
				//Updating snake body coords and remov snakesBody class;
				Object.assign(this.snake[i + 1], newArr[i]);
				dQs(`[posX = "${this.snake[this.snake.length-1].posX}"][posY = "${this.snake[this.snake.length-1].posY}"]`).classList.remove('snakeBody');
			}
		}

		this.drawSnake();
	}

	_appleEat() {
		if(dQs(`[posX = "${this.snake[0].posX}"][posY = "${this.snake[0].posY}"]`).classList.contains('apple')) {
			let appleDiv = dQs(`[posX = "${this.snake[0].posX}"][posY = "${this.snake[0].posY}"]`);
			appleDiv.classList.remove('apple');
			appleDiv.innerHTML = '';

			//Increase the length of the snake;
			this.snake.push({
				posX: this.snake[this.snake.length - 1].posX,
				posY: this.snake[this.snake.length - 1].posY
			});

			//Speed up the snake. Top speed 35;
			this.moveSpeed -= 5;
			this.moveSpeed < 35 ? this.moveSpeed = 35 : false;

			//Update player's score
			this.scoreScreen.innerHTML = this.score += 10;

			super.appleSet();
		}
	}

	_coords_and_eat() {
		this._updateCoords(this.snakeOldHead);
		this._appleEat();

		//Saving previous direction;
		this.direction.prevDirect = this.direction.currentDirect;
	}
}

function wayCheck(way) {
	return  way.currentDirect == 37 && way.prevDirect == 39 ||
			way.currentDirect == 38 && way.prevDirect == 40 ||
			way.currentDirect == 39 && way.prevDirect == 37 ||
			way.currentDirect == 40 && way.prevDirect == 38
}