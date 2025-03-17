import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Rotating a Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  // TODO: A falling tetrominoes can be rotated clockwise
  test("a falling tetrominoes can be rotated clockwise", () => {
    board.drop(Tetromino.T_SHAPE);
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`,
    );
    board.roteRight();
    expect(board.toString()).to.equalShape(
      `...T......
       ...TT.....
       ...T......
       ..........
       ..........
       ..........`,
    );

  });
  // TODO: A falling tetrominoes can be rotated counter clockwise
  // TODO: it can not be when thereis no room to rotate(left wall, right wall, other pieces...)
  // TODO: when a piece is up again a wall(or a piece), and it is rotated(no room for rotate), move away from the wall ("walckik")
}); 