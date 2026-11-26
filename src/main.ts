import _ from "lodash";
import { readInput } from "./aoc.ts";
import { Command } from "commander";

const program = new Command();

type HasCode = { code: string };

// TODO: probaby a way without disabling the linter rule
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasCode(err: any): err is HasCode {
  return _.isString(err.code);
}

function parseNumberList(str: string): number[] {
  return _(str)
    .split(",")
    .map((s) => parseInt(s, 10))
    .value();
}

program
  .name("advent-of-code-2026")
  .description("AoC 2026 Solutions")
  .option(
    "--days <days>",
    "Comma seperated list of days to run",
    parseNumberList,
    _.range(1, 26),
  )
  .option(
    "--years <years",
    "Comma seperated list of years to run",
    parseNumberList,
    _.range(15, 26),
  );

async function main(argv: string[]) {
  program.parse(argv);
  const { years, days } = program.opts();

  for (const year of years) {
    for (const day of days) {
      try {
        const dayStr = `${year * 100 + day}`;
        const puzzleInput = readInput(`./inputs/day${dayStr}.txt`);
        const solver = await import(`./day${dayStr}.ts`);

        console.log(`Day ${day}:`);

        const begin1 = process.hrtime.bigint();
        const soln1 = solver.part1(puzzleInput);
        const millis1 = (process.hrtime.bigint() - begin1) / 1000000n;
        console.log(
          `  part1: ${JSON.stringify(soln1, null, 2)} (${millis1} ms)`,
        );

        const begin2 = process.hrtime.bigint();
        const soln2 = solver.part2(puzzleInput);
        const millis2 = (process.hrtime.bigint() - begin2) / 1000000n;
        console.log(
          `  part2: ${JSON.stringify(soln2, null, 2)} (${millis2} ms)`,
        );
      } catch (err: unknown) {
        // ENOENT means the input file is missing; skip
        if (hasCode(err) && err.code === "ENOENT") {
          continue;
        }
        throw err;
      }
    }
  }
}

main(process.argv).catch((err) =>
  process.nextTick(() => {
    throw err;
  }),
);
