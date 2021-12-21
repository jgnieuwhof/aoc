import { answer, check } from "./lib.ts";

import { __dirname, readLines } from "../lib/fs.ts";

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");
  console.log(`🌟 ${answer(lines.map(check))} 🌟`);
};
