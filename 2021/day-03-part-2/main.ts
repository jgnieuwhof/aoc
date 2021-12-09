import { __dirname, readLines } from "../lib/fs.ts";

const countBits = (lines: string[], position: number) => {
  const { length } = lines;
  const sum = lines.reduce((sum, line) => sum + +line[position], 0);
  return {
    sum,
    most: sum > (length / 2) ? 1 : 0,
    least: sum < (length / 2) ? 1 : 0,
  };
};

const calculateImpl = (
  lines: string[],
  common: boolean,
  position = 0,
): string => {
  if (lines.length === 1) {
    return lines[0];
  }

  const { most, least } = countBits(lines, position);

  let bit: number;
  if (most === least) {
    bit = common ? 1 : 0;
  } else {
    bit = common ? most : least;
  }

  return calculateImpl(
    lines.filter((line) => +line[position] === bit),
    common,
    position + 1,
  );
};

export const calculate = (lines: string[]) => {
  const oxygen = parseInt(calculateImpl(lines, true), 2);
  const c02 = parseInt(calculateImpl(lines, false), 2);
  return { oxygen, c02 };
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");

  const { oxygen, c02 } = calculate(lines);

  console.log(`c ${c02} o ${oxygen} ls ${oxygen * c02}`);
};
