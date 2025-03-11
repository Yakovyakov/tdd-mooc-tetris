import { shapeToString } from "./shape.mjs";

export class RotatingShape {
  #shape;

  static fromString(shape) {
    return new RotatingShape(
      shape.replaceAll(' ', '').split('\n').map((row) => row.split(""))
    );
  }

  constructor(shape) {
    console.log(shape);
    this.#shape = shape;
  }
  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

  rotateRight(){
    shapeRotated = new Array(this.#shape.lenth);
    for (let row = 0; row < this.#shape.length; row++) {
      shapeRotated[row] = new Array(this.#shape.length);
      for (let column = 0; column < this.#shape.length; column++) {
        shapeRotated[row][column] = this.#shape[this.#shape.length - 1 - column][row];
      }
    }
    return new RotatingShape(shapeRotated);
  }
  blockAt(row,col){
    return this.#shape[row][col];
  }

  toString() {
    return shapeToString(this);
  }

}