import { Result, Totals } from "./types.ts";
import { __dirname, readLines } from "../lib/fs.ts";

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

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "readings");
  const results = calculate(lines.map((x) => parseInt(x)));
  const totals = calculateTotals(results);

  console.log(results.map(formatResult).join("\n"));
  console.log();
  console.log(
    Object.entries(totals).map(([key, val]) => `${key}: ${val}`).join("\n"),
  );
};
