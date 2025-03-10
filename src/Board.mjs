export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let s = '';
    for ( let row = 0; row < this.width; row++ ) {
      for ( let col = 0; col < this.height; col++){
        s += '.';
      }
      s += '\n'
    }
    return s;
  }

}

