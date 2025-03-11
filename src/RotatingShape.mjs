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
    const size = this.#shape.length;
    const shapeRotated = new Array(size);
    for (let row = 0; row < size; row++) {
      shapeRotated[row] = new Array(size);
      for (let column = 0; column < size; column++) {
        shapeRotated[row][column] = this.#shape[size - 1 - column][row];
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