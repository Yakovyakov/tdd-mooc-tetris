import { shapeToString } from "./shape.mjs";

const EMPTY = '.';

class Block {
  #letter;
  constructor(letter) {
    this.#letter = letter;
  }
  blockAt(row,col){
    return this.#letter;
  }
  letter() {
    return this.#letter;
  }
  
  width(){
    return 1;
  }

  height(){
    return 1;
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
      return this.shape.blockAt(row,col);
    } else {
      return EMPTY;
    }
  }

  moveDown() {
    return new MovableShape(this.shape, this.row + 1, this.col);
  }

}

export class Board {
  #width;
  #height;
  #falling=null;
  #immobile;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row ++) 
      this.#immobile[row] = new Array(width).fill(EMPTY);
  }
  hasFalling() {
    return this.#falling !== null;
  }

  height() {
    return this.#height;
  }

  width() {
    return this.#width;
  }

  blockAt (row,col) {
    if (this.hasFalling()) {
      const block = this.#falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return (this.#immobile[row][col]);
  }

  drop(letter) {
    if (typeof letter === "string") {
      letter = new Block(letter);
    }
    if (this.hasFalling()) {
      throw new Error("another piece is already falling");
    }
    this.#falling = new MovableShape(letter, 0, Math.floor((this.width() - 1) / 2));
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)){
      this.#stopFalling();
    } else {
      this.#falling = attempt;
    }
  }

  #hitsFloor(falling) {
    if (falling.row >= this.height()) {
      return true;
    }

    return false;
  }
  #hitsImmobile(falling) {
    if (this.#immobile[falling.row][falling.col] !== EMPTY) {
      return true;
    }
  return false;
  }
  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#falling = null;
  }

  toString() {
    return shapeToString(this);
  }
}
