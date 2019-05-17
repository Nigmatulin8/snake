import Snake from './components/Snake.js';
import Game from './components/Game.js';

const game = new Game('screen');
const snake = new Snake();

const overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
	overlay.style.display = 'none';
	startGame();
});

function startGame() {
	game.fieldCreate();
	snake.drawSnake();
	game.appleSet();

	window.addEventListener('keydown', event => {
		snake.move(event);
	});
}