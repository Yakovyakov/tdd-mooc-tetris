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
      return '.';
    }
  }
}

export class Board {
  width;
  height;
  falling=null;
  immobile;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.immobile = new Array(height);
    for (let row = 0; row < height; row ++) 
      this.immobile[row] = new Array(width).fill('.');
  }

  blockAt (row,col) {
    if (this.falling) {
      const block = this.falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return (this.immobile[row][col]);
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
