import { firstNova, parse } from "./lib.ts";

import { __dirname, readFile } from "../lib/fs.ts";

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  console.log(`🌟 ${firstNova(parse(input))} 🌟`);
};
