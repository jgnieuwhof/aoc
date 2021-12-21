import { answer, basins, lowPoints, parse, print } from "./lib.ts";

import { __dirname, readFile } from "../lib/fs.ts";

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const map = lowPoints(parse(input));
  console.log(`\n${print(map)}`);
  console.log(`🌟 ${answer(basins(map))} 🌟`);
};
