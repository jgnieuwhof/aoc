import { __dirname, readLines } from "../lib/fs.ts";

export const calculate = (lines: string[]) => {
  const { length } = lines[0];

  const counts = lines.reduce<number[]>(
    (results, line) => results.map((count, i) => count + +line[i]),
    Array.from<number>({ length }).fill(0),
  );

  let gamma = 0x00;
  let epsilon = 0x00;

  for (const count of counts) {
    gamma = gamma << 1;
    epsilon = epsilon << 1;

    if (count > lines.length / 2) {
      gamma++;
    } else {
      epsilon++;
    }
  }

  return { gamma, epsilon };
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");

  const { gamma, epsilon } = calculate(lines);

  console.log(`g ${gamma} e ${epsilon} p ${gamma * epsilon}`);
};
