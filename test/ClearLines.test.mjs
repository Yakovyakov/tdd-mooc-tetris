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

  test("a board can clear Full non empty rows", () => {
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

  test("a falling Tetrominoes can clear a single line when full fill rows", () => {
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
    expect(board.toString(), "a board have to clean rows 2").to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .........T
       XXXXXXX.XT`,
    );
  });

  test("a falling Tetrominoes can clear 2 lines when full fill rows", () => {
    board.loadFromString(
      `..........
       ..........
       ..........
       .......XXX
       XXX..XXXXX
       XXXX.XXXXX`,
    );
    board.drop(Tetromino.S_SHAPE);
    board.moveDown();
    board.rotateRight();
    fallToBottom(board);
    expect(
      board.toString(),
      "a board have to clean rows 1 and 2",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ...S...XXX`,
    );
  });

  test("a falling Tetrominoes can clear 3 lines when full fill rows", () => {
    board.loadFromString(
      `..........
       ..........
       XX.....XXX
       XXX..XXXXX
       XXXX.XXXXX
       XXXX.XXXXX`,
    );
    board.drop(Tetromino.L_SHAPE);
    board.moveDown();
    board.rotateRight();
    fallToBottom(board);
    expect(
      board.toString(),
      "a board have to clean rows 1,2 and 3",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       XX.....XXX`,
    );
  });

  test("a falling Tetrominoes can clear 4 lines when full fill rows", () => {
    board.loadFromString(
      `..........
       ........XX
       XXXX.XXXXX
       XXXX.XXXXX
       XXXX.XXXXX
       XXXX.XXXXX`,
    );
    board.drop(Tetromino.I_SHAPE);
    board.moveDown();
    board.rotateRight();
    fallToBottom(board);
    expect(
      board.toString(),
      "a board have to clean rows 1,2,3 and 4",
    ).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ........XX`,
    );
  });
});
