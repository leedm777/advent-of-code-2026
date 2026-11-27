import _ from "lodash";
import * as aoc from "./aoc.ts";

const DIRECTIONS = [
  [0, -1], // NORTH
  [1, 0], // EAST
  [0, 1], // SOUTH
  [-1, 0], // WEST
];

export function part1([input]: string[]) {
  return _.chain(input)
    .split(", ")
    .map((s) => ({ dir: s.slice(0, 1), dist: _.parseInt(s.slice(1), 10) }))
    .reduce(
      ({ facing, pos }, { dir, dist }) => {
        if (dir === "R") {
          facing = aoc.mod(facing + 1, 4);
        } else {
          facing = aoc.mod(facing - 1, 4);
        }
        return {
          facing,
          pos: [
            pos[0] + DIRECTIONS[facing][0] * dist,
            pos[1] + DIRECTIONS[facing][1] * dist,
          ],
        };
      },
      {
        facing: 0,
        pos: [0, 0],
      },
    )
    .thru(({ pos: [x, y] }) => Math.abs(x) + Math.abs(y))
    .value();
}

export function part2([input]: string[]) {
  const parsed = _.chain(input)
    .split(", ")
    .map((s) => ({ dir: s.slice(0, 1), dist: _.parseInt(s.slice(1), 10) }))
    .value();

  let facing = 0;
  let pos = [0, 0];
  let visited: string[] = [];

  for (const { dir, dist } of parsed) {
    if (dir === "R") {
      facing = aoc.mod(facing + 1, 4);
    } else {
      facing = aoc.mod(facing - 1, 4);
    }

    for (let i = 1; i <= dist; ++i) {
      if (_.includes(visited, JSON.stringify(pos))) {
        return Math.abs(pos[0]) + Math.abs(pos[1]);
      }

      visited = [...visited, JSON.stringify(pos)];
      pos = [pos[0] + DIRECTIONS[facing][0], pos[1] + DIRECTIONS[facing][1]];
    }
  }
  return 0;
}
