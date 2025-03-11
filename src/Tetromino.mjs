import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	
	static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`
  );

	static I_SHAPE = Tetromino.fromString(
    `.....
    .....
    IIII.
    .....
    .....`
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
		return new Tetromino(this.#shape.rotateLeft());
	}

	blockAt() {}
	
	toString() {
		return this.#shape.toString();
	}
	
}
