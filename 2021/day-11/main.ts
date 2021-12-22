import { parse, print, simulate } from "./lib.ts";

import { __dirname, readFile } from "../lib/fs.ts";

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const { grid, flashes } = simulate(parse(input), 100);

  console.log();
  console.log(print(grid, { fancy: true }));
  console.log();
  console.log(`🌟 ${flashes} 🌟`);
};
