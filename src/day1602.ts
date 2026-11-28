import _ from "lodash";
import * as aoc from "./aoc.ts";

const Keypad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export function part1(input: string[]) {
  const inst = _(input)
    .map((line) =>
      _.map(line, (ch) => {
        switch (ch) {
          case "U":
            return [-1, 0];
          case "D":
            return [1, 0];
          case "L":
            return [0, -1];
          case "R":
            return [0, 1];
        }
      }),
    )
    .value();
  let pos = [1, 1];
  let val = 0;

  for (const moves of inst) {
    for (const move of moves) {
      pos = _(pos)
        .zip(move)
        .map(_.sum)
        .map((v) => Math.max(v, 0))
        .map((v) => Math.min(v, 2))
        .value();
    }
    const v = _.get(Keypad, pos);
    val = val * 10 + v;
  }
  return val;
}

export const Keypad2 = [
  [null, null, "1", null, null],
  [null, "2", "3", "4", null],
  ["5", "6", "7", "8", "9"],
  [null, "A", "B", "C", null],
  [null, null, "D", null, null],
];

const Moves = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

export function keypadMove(
  keypad: (string | null)[][],
  pos: number[],
  direction: keyof typeof Moves,
): number[] {
  const nextPos = aoc.move(pos, Moves[direction]);
  const nextCh = _.get(keypad, nextPos);
  if (_.isNil(nextCh)) {
    // if off the board, do not move
    return pos;
  }
  return nextPos;
}

export function isMove(ch: string): ch is keyof typeof Moves {
  return Object.hasOwn(Moves, ch);
}

export function keypadMoveAll(
  keypad: (string | null)[][],
  pos: number[],
  directions: string,
): number[] {
  return _.reduce(
    directions,
    (pos, direction) => {
      if (!isMove(direction)) throw new Error("Invalid move type");
      return keypadMove(keypad, pos, direction);
    },
    pos,
  );
}
export function part2(input: string[]) {
  const { acc: res } = _.reduce(
    input,
    ({ pos, acc }, directions) => {
      const nextPos = keypadMoveAll(Keypad2, pos, directions);
      const nextCh = _.get(Keypad2, nextPos);
      return {
        pos: nextPos,
        acc: `${acc}${nextCh}`,
      };
    },
    { pos: [2, 0], acc: "" },
  );
  return res;
}
