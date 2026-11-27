import { describe, expect, it } from "vitest";
import { part1, part2 } from "./day1602.ts";
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

  // eslint-disable-next-line vitest/no-disabled-tests
  describe.skip("part 2", () => {
    it("should work with the sample", () => {
      const actual = part2(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    it("should work with the puzzle input", () => {
      const actual = part2(puzzleInput);
      expect(actual).toStrictEqual("TODO");
    });
  });
});
