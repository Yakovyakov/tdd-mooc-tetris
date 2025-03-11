import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	#shape;
	constructor(initialShape) {
			this.#shape = initialShape;
	}

	fromString(initialShape){
		const shape = RotatingShape.fromString(initialShape);
		return new Tetromino(shape);
	}
	rotateRight() {

	}
	
	rotateLeft() {

	}

	blockAt() {}
	
	toString() {}
	
}
