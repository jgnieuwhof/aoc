import * as path from "https://deno.land/std@0.116.0/path/mod.ts";

import { Result, Totals } from "./types.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const getReadings = async (filename: string) => {
  const decoder = new TextDecoder("utf-8");
  const buffer = await Deno.readFile(path.join(__dirname, filename));
  return decoder.decode(buffer).split("\n").map((line) => parseInt(line));
};

const calculate = (readings: number[]): Result[] => {
  return readings.map(
    (_, i, arr) => ({
      reading: arr[i],
      differential: arr[i] - arr[i - 1],
      sum3: arr[i] + arr[i - 1] + arr[i - 2],
    }),
  ).map((result, i, arr) => ({
    ...result,
    sum3Differential: result.sum3 - arr[i - 1]?.sum3,
  }));
};

const calculateTotals = (
  results: Result[],
): Totals => {
  return {
    count: results.length,
    diffInc: results.map((x) => x.differential).reduce(
      (count, x) => x > 0 ? count + 1 : count,
      0,
    ),
    diffDec: results.map((x) => x.differential).reduce(
      (count, x) => x < 0 ? count + 1 : count,
      0,
    ),
    sum3Inc: results.map((x) => x.sum3Differential).reduce(
      (count, x) => x > 0 ? count + 1 : count,
      0,
    ),
    sum3Dec: results.map((x) => x.sum3Differential).reduce(
      (count, x) => x < 0 ? count + 1 : count,
      0,
    ),
  };
};

const formatResult = (result: Result) => {
  return `${result.reading} (${result.differential}) (${result.sum3}) (${result.sum3Differential})`;
};

const main = async (args: string[]) => {
  const [filename = "readings"] = args;
  const readings = await getReadings(filename);
  const results = calculate(readings);
  const totals = calculateTotals(results);

  console.log(results.map(formatResult).join("\n"));
  console.log();
  console.log(
    Object.entries(totals).map(([key, val]) => `${key}: ${val}`).join("\n"),
  );
};

main(Deno.args).then(() => Deno.exit(0)).catch((error) => {
  console.error(error);
  Deno.exit(1);
});
