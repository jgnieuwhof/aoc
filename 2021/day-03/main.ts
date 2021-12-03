import { __dirname, readLines } from "../lib/fs.ts";

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");
  const { length } = lines[0];

  const counts = lines.reduce<number[]>(
    (results, line) => results.map((count, i) => count + +line[i]),
    Array.from<number>({ length }).fill(0),
  );

  let gamma = 0x00;
  let epsilon = 0x00;

  for (const count of counts) {
    if (count > lines.length / 2) {
      gamma++;
    } else {
      epsilon++;
    }
    gamma = gamma << 1;
    epsilon = epsilon << 1;
  }

  console.log(`g ${gamma} e ${epsilon} p ${gamma * epsilon}`);
};
