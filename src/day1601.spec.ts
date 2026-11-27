import { describe, expect, it } from "vitest";
import { part1, part2 } from "./day1601.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day1601.txt");
const exampleInputs: [[string], number][] = [
  [["R2, L3"], 5],
  [["R2, R2, R2"], 2],
  [["R5, L5, R5, R3"], 12],
];

describe("day1", () => {
  describe("part 1", () => {
    it.each(exampleInputs)(
      "should work with the sample %s",
      (exampleInput, expected) => {
        const actual = part1(exampleInput);
        expect(actual).toStrictEqual(expected);
      },
    );
    it("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual(291);
    });
  });

  describe("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(["R8, R4, R4, R8"]);
      expect(actual).toStrictEqual(4);
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual(159);
    });
  });
});
