import _ from "lodash";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
