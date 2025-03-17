import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function moveToLeftWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveToRightWall(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function moveStepsDown(board, stepts) {
  for (let i = 0; i < stepts; i++) {
    board.moveDown();
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
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`,
    );

  });
  // TODO: A falling tetrominoes can be rotated counter clockwise
  test("a falling tetrominoes can be rotated counter clockwise", () => {
    board.drop(Tetromino.T_SHAPE);
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`,
    );
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`,
    );

  });
  // TODO: it can not be when thereis no room to rotate(left wall, right wall, other pieces...)
  test("it can not be when thereis no room to rotate(left wall)", () => {
    board.loadFromString(
      `..........
       ..........
       ..........
       ..XX......
       ..XX......
       ..XX......`,
    )
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToLeftWall(board);
    moveStepsDown(board, 3);
    expect(
      board.hasFalling(),
      "the player should still be able to rotate the block",
    ).to.be.true;
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .TXX......
       TTXX......
       .TXX......`,
    );

  });

  test("it can not be when thereis no room to rotate(right wall)", () => {
    board.loadFromString(
      `..........
       ..........
       ..........
       ......XX..
       ......XX..
       ......XX..`,
    )
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToRightWall(board);
    moveStepsDown(board, 3);
    expect(
      board.hasFalling(),
      "the player should still be able to rotate the block",
    ).to.be.true;
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......XX.T
       ......XXTT
       ......XX.T`,
    );

  });

  test("it can not be when thereis no room to rotate(other piece)", () => {
    board.loadFromString(
      `..........
       ..........
       ..........
       .XX..XX...
       .XX..XX...
       .XX..XX...`,
    )
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveStepsDown(board, 3);
    expect(
      board.hasFalling(),
      "the player should still be able to rotate the block",
    ).to.be.true;
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .XX.TXX...
       .XXTTXX...
       .XX.TXX...`,
    );

  });

  // TODO: when a piece is up again a wall(or a piece), and it is rotated(no room for rotate), move away from the wall ("walckik")
  describe('Can walckick', () => {
    test("can  walckick on left wall", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();
      moveToLeftWall(board);
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
        `TTT.......
         .T........
         ..........
         ..........
         ..........
         ..........`,
      );
  
    });
  });
}); 