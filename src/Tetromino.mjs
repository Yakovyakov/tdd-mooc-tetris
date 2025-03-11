import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	
	static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`
  );

	#shape;
	static fromString(initialShape) {
		const shape = RotatingShape.fromString(initialShape);
		return new Tetromino(shape);
	}

	constructor(initialShape) {
			this.#shape = initialShape;
	}

	rotateRight() {
		return new Tetromino(this.#shape.rotateRight());
	}
	
	rotateLeft() {

	}

	blockAt() {}
	
	toString() {
		return this.#shape.toString();
	}
	
}
