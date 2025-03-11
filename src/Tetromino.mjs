import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
	
	static T_SHAPE = Tetromino.fromString(
    `.T.
     TTT
     ...`,
		 0,
		 4
  );

	static I_SHAPE = Tetromino.fromString(
    `.....
    .....
    IIII.
    .....
    .....`,
		0,
		2
	);

	#currentOrintation;
	#orientations;
	#shape;
	static fromString(initialShape, currentOrientation, orientationCount = 4) {
		const shape = RotatingShape.fromString(initialShape);
		const orientations=[shape,
			shape.rotateRight(),
			shape.rotateRight().rotateRight(),
			shape.rotateRight().rotateRight().rotateRight()
		].slice(0,orientationCount);
		return new Tetromino(shape, currentOrientation, orientations);
	}

	constructor(initialShape, currentOrientations, orientations) {
			this.#shape = initialShape;
			this.#currentOrintation = currentOrientations;
			this.#orientations = orientations;
	}

	rotateRight() {
		return new Tetromino(this.#shape.rotateRight(), this.#currentOrintation + 1, this.#orientations);
	}
	
	rotateLeft() {
		return new Tetromino(this.#shape.rotateLeft(),this.#currentOrintation - 1, this.#orientations);
	}

	blockAt() {}
	
	toString() {
		return this.#shape.toString();
	}
	
}
