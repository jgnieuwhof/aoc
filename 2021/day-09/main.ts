import { calculateLowPoints, calculateRisk, parse, print } from "./lib.ts";

import { __dirname, readFile } from "../lib/fs.ts";

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const map = calculateLowPoints(parse(input));

  console.log(`\n${print(map)}`);
  console.log(`🌟 ${calculateRisk(map)} 🌟`);
};
