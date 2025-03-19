import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring System", () => {
  let scoring;
  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("At level 0 a cleared line is worth 40 points", () => {
    scoring.update(1);
    expect(scoring.score).to.equal(40);
  });
});

