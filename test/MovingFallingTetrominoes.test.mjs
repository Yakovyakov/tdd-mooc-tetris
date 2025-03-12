import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}
function goToLeftWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function goToRightWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}


describe("Moving Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`,
    );
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`,
    );
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`,
    );
  });

  test("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`,
    );
  });

  test("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`,
    );
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`,
    );
  });

  test("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`,
    );
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`,
    );
  });

  test("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveDown();
    board.moveDown();
    board.moveDown();
    expect(board.toString(),
      'the piece arrived at the floor'
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`,
    );
    expect(board.hasFalling(),
      "the player should still be able to move the block",
    ).to.be.true;
    board.moveDown();
    expect(board.toString(),
      'the piece is on the floor').to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`,
    );
    expect(board.hasFalling(),
      "not piece falling",
    ).to.be.false;
  });

  test("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    goToLeftWall(board);
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    goToLeftWall(board);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ...T......
       OOTTT.....
       OO........
       OO........
       OO........`,
    );
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ...T......
       OOTTT.....
       OO........
       OO........
       OO........`,
    );
  });

});
