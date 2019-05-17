const dQs = val => {
	return document.querySelector(val);
}

export default class Game {
	constructor(field) {
		this.field = field,
		this.score = 0;

		this.scoreScreen = dQs('.scoreDiv');
	}

	fieldCreate() {
		let screen = document.getElementById(this.field);

		let field_x_coord = 1;
		let field_y_coord = 52;

		for(let i = 0; i < 2754; i++) {
			let cell = document.createElement('div');
			cell.setAttribute('class', 'cell');
			cell.setAttribute('posX', field_x_coord);
			cell.setAttribute('posY', field_y_coord);

			if (field_x_coord == 52) {
				field_x_coord = 0;
				field_y_coord--;
			}
			field_x_coord++;

			screen.appendChild(cell);
		}
	}

	appleSet() {
		let apple_x = Math.floor(Math.random() * 50) + 2;
		let apple_y = Math.floor(Math.random() * 50) + 2;

		if(dQs(`[posX = "${apple_x}"][posY = "${apple_y}"]`).classList.contains('snakeBody')) {
			this.appleSet();
		}
		else {
			dQs(`[posX = "${apple_x}"][posY = "${apple_y}"]`).classList.add('apple');
			dQs(`[posX = "${apple_x}"][posY = "${apple_y}"]`).innerHTML = '★';
		}
	}

	endGame() {
		dQs('.endgame').style.display = 'block';
	}
}