import { applyFold, count, createGrid, parse } from "./lib.ts";

import { __dirname, readFile } from "../lib/fs.ts";

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const { folds, points } = parse(input);
  const grid = createGrid(points);
  console.log(`🌟 ${count(applyFold(folds[0], grid))} 🌟`);
};
