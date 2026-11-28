#!/bin/bash

#
# Prep for today's challenge. You'll need to grab the session cookie from the
# browser and put it into .cookies.txt for authentication.
#

# Puzzles are released at midnight Eastern time
export TZ=America/New_York

day=${1:-$(date +%d)}
year=${2:-$(date +%Y)}

if test ${year} -lt 100; then
  year=$(( 2000 + year ))
fi

year_day=$(( (year-2000) * 100 + day ))
problem=./inputs/day${year_day}.html
input=./inputs/day${year_day}.txt
url=https://adventofcode.com/${year}/day/$((10#${day}))

# always fetch the puzzle text, since it updates for part 2
mkdir -p ./inputs/
curl \
  --output "${problem}" \
  --fail \
  --cookie .cookies.txt \
  "${url}"

if test $? -ne 0; then
  echo "${problem} failed to download" >&2
  exit 1
fi

if ! test -e "${input}"; then
  curl \
    --output "${input}" \
    --fail \
    --cookie .cookies.txt \
    "${url}"/input

  if test $? -ne 0; then
    echo "${input} failed to download" >&2
    exit 1
  fi
fi


if test -e src/day"${year_day}".ts; then
  echo "day${day}.ts already exists" >&2
  exit 1
fi

head "${input}"

cat <<EOF > "src/day${year_day}.ts"
import _ from "lodash";

export function part1(input: string[]) {
  return "TODO";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string[]) {
  return "TODO";
}
EOF

cat <<EOF > "src/day${year_day}.spec.ts"
import { describe, expect, it } from "vitest";
import { part1, part2 } from "./day${year_day}.ts";
import { readInput } from "./aoc.ts";

const puzzleInput = readInput("./inputs/day${year_day}.txt");
const exampleInput = [
];

describe("day${year_day}", () => {
  describe("part 1", () => {
    it("should work with the sample", () => {
      const actual = part1(exampleInput);
      expect(actual).toStrictEqual("TODO");
    });
    // eslint-disable-next-line vitest/no-disabled-tests
    it.skip("should work with the puzzle input", () => {
      const actual = part1(puzzleInput);
      expect(actual).toStrictEqual("TODO");
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
EOF

open "${url}"
