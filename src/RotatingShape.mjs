export class RotatingShape {
  #shape;

  static fromString(shape) {
    return new RotatingShape(
      shape.split("\n").map((row) => row.split(""))
    );
  }

  constructor(shape) {
    this.#shape = shape;
  }
  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }
  
  toString() {
    let s = '';
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        s += this.blockAt(row,col);
      }
      s += "\n";
    }
    return s;
  }

}