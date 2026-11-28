import { describe, expect, it } from "vitest";
import {
  part1,
  part2,
  Keypad2,
  keypadMove,
  keypadMoveAll,
  isMove,
} from "./day1602.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day1602.txt");
const exampleInput: string[] = ["ULL", "RRDDD", "LURDL", "UUUUD"];

describe("day1602", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual(1985);
    });
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(84452);
    });
  });

  describe("part 2", () => {
    describe("keypadMove", () => {
      it.each([
        [[2, 0], "R", [2, 1]],
        [[2, 0], "L", [2, 0]],
        [[2, 0], "U", [2, 0]],
        [[2, 0], "D", [2, 0]],
        [[2, 2], "R", [2, 3]],
      ])("from %s to %s", (pos, dir, expected) => {
        if (!isMove(dir)) throw new Error(`Illegal move ${dir}`);
        const actual = keypadMove(Keypad2, pos, dir);
        expect(actual).toStrictEqual(expected);
      });
    });
    describe("keypadMoveAll", () => {
      it.each([
        [[2, 0], "ULL", [2, 0]],
        [[2, 0], "RRDDD", [4, 2]],
      ])("from %s to %s", (pos, dirs, expected) => {
        const actual = keypadMoveAll(Keypad2, pos, dirs);
        expect(actual).toStrictEqual(expected);
      });
    });
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual("5DB3");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("D65C3");
    });
  });
});
