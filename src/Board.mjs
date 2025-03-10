const EMPTY = '.';
class Block {
  letter;
  constructor(letter) {
    this.letter = letter;
  }
}

class MovableShape {
  shape;
  row;
  col;

  constructor(shape, row, col) {
    this.shape = shape;
    this.row = row;
    this.col = col;
  }
  blockAt(row,col){
    if (row === this.row && col === this.col) {
      return this.shape.letter;
    } else {
      return EMPTY;
    }
  }

  moveDown() {
    return new MovableShape(this.shape, this.row + 1, this.col);
  }

}

export class Board {
  width;
  height;
  #falling=null;
  immobile;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.immobile = new Array(height);
    for (let row = 0; row < height; row ++) 
      this.immobile[row] = new Array(width).fill(EMPTY);
  }
  hasFalling() {
    return this.#falling !== null;
  }

  blockAt (row,col) {
    if (this.hasFalling()) {
      const block = this.#falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return (this.immobile[row][col]);
  }

  drop(letter) {
    if (typeof letter === "string") {
      letter = new Block(letter);
    }
    if (this.hasFalling()) {
      throw new Error("another piece is already falling");
    }
    this.#falling = new MovableShape(letter, 0, Math.floor((this.width - 1) / 2));
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    this.#falling = attempt;
  }

  #hitsFloor(falling) {
    for (const block of falling.nonEmptyBlocks()) {
      if (block.row >= this.height) {
        return true;
      }
    }
    return false;
  }
  toString() {
    let s = '';
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.blockAt(row,col);
      }
      s += "\n";
    }
    return s;
  }
}
