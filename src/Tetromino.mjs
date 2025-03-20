import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static I_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       IIII
       ....
       ....`,
    ),
    RotatingShape.fromString(
      `..I.
       ..I.
       ..I.
       ..I.`,
    ),
  ]);

  static T_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       TTT.
       .T..
       ....`,
    ),
    RotatingShape.fromString(
      `.T..
       TT..
       .T..
       ....`,
    ),
    RotatingShape.fromString(
      `....
       .T..
       TTT.
       ....`,
    ),
    RotatingShape.fromString(
      `.T..
       .TT.
       .T..
       ....`,
    ),
  ]);

  static L_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       LLL.
       L...
       ....`,
    ),
    RotatingShape.fromString(
      `LL..
       .L..
       .L..
       ....`,
    ),
    RotatingShape.fromString(
      `....
       ..L.
       LLL.
       ....`,
    ),
    RotatingShape.fromString(
      `.L..
       .L..
       .LL.
       ....`,
    ),
  ]);

  static J_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       JJJ.
       ..J.
       ....`,
    ),
    RotatingShape.fromString(
      `.J..
       .J..
       JJ..
       ....`,
    ),
    RotatingShape.fromString(
      `....
       J...
       JJJ.
       ....`,
    ),
    RotatingShape.fromString(
      `.JJ.
       .J..
       .J..
       ....`,
    ),
  ]);

  static S_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       .SS.
       SS..
       ....`,
    ),
    RotatingShape.fromString(
      `S...
       SS..
       .S..
       ....`,
    ),
  ]);

  static Z_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       ZZ..
       .ZZ.
       ....`,
    ),
    RotatingShape.fromString(
      `..Z.
       .ZZ.
       .Z..
       ....`,
    ),
  ]);

  static O_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       .OO.
       .OO.
       ....`,
    ),
  ]);

  #currentOrintation;
  #orientations;

  static fromString(initialShape, currentOrientation, orientationCount = 4) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new Tetromino(currentOrientation, orientations);
  }

  constructor(currentOrientation, orientations) {
    this.#currentOrintation =
      (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
    //    for (let i = 0; i < this.#orientations.length; i++)
    //      console.log(this.#orientations[i].toString());
  }

  #shape() {
    return this.#orientations[this.#currentOrintation];
  }
  rotateRight() {
    return new Tetromino(this.#currentOrintation + 1, this.#orientations);
  }

  rotateLeft() {
    return new Tetromino(this.#currentOrintation - 1, this.#orientations);
  }

  width() {
    return this.#shape().width();
  }

  height() {
    return this.#shape().height();
  }

  blockAt(row, col) {
    return this.#orientations[this.#currentOrintation].blockAt(row, col);
  }

  toString() {
    return this.#shape().toString();
  }
}
