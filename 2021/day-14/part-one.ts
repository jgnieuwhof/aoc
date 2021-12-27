import { count, parse, score } from "./lib.ts";
import { Main, run } from "../lib/run.ts";

const main: Main = (_, { input }) => {
  const result = score(count(parse(input!), 10));
  console.log(`🌟 ${result} 🌟`);
};

run(main, { importMetaUrl: import.meta.url });
