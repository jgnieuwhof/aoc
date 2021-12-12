import { __dirname, readFile } from "../lib/fs.ts";

interface Answer {
  min: number;
  position: number;
}

export const parse = (str: string): number[] => str.split(",").map((n) => +n);

export const calculate = (crabs: number[]): Answer => {
  const xMax = Math.max(...crabs) + 1;

  const costs = Array.from({ length: xMax }).map((_, x) =>
    crabs.reduce((cost, crab) => cost + Math.abs(x - crab), 0)
  );

  const [min, position] = costs.reduce(
    ([min, pos], cost, i) => cost < min ? [cost, i] : [min, pos],
    [Infinity, 0],
  );

  return { min, position };
};

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const crabs = parse(input);
  const { min, position } = calculate(crabs);
  console.log(`🦀 min (${min}) position (${position})`);
};
