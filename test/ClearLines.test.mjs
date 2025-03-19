import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";

import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


import { Tetromino } from "../src/Tetromino.mjs";

import { OldTetrominoesRotationsRules } from "./OldTetrominoesRotationsRules.mjs";

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

describe("Clear Lines", () => {

  let board;

  beforeEach(() => {
    board = new Board(10, 6);
  });

  test('a board can clear Full non empty rows', () => {

    board.loadFromString(
      `..........
       5........5
       4444444444
       3333333333
       2222..2222
       1111111111`,
    );
    board._clearLines();
    expect(
      board.toString(),
      "a board have to clean rows 1,3 and 4",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       5........5
       2222..2222`,
    );
  });

});

describe("Clear lines when falling a Tetrominoes", () => {

  let board;

  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling Tetrominoes can clear a single lines when full fill rows", () => {
    board.loadFromString(
      `..........
       ..........
       ..........
       ..........
       XXXXXXXX..
       XXXXXXX.X.`,
    );
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    board.rotateRight();
    moveToRightWall(board);
    fallToBottom(board);
    expect(
      board.toString(),
      "a board have to clean rows 2",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .........T
       XXXXXXX.XT`,
    );


  });

});