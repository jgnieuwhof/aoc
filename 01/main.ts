import * as path from "https://deno.land/std@0.116.0/path/mod.ts";

import { Totals } from "./types.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const getReadings = async (filename: string) => {
  const decoder = new TextDecoder("utf-8");
  const buffer = await Deno.readFile(path.join(__dirname, filename));
  return decoder.decode(buffer).split("\n").map((line) => parseInt(line));
};

const calculateTotals = (
  readings: number[],
  differentials: number[],
): Totals => {
  return {
    count: readings.length,
    increased: differentials.reduce(
      (count, x) => x > 0 ? count + 1 : count,
      0,
    ),
    decreased: differentials.reduce(
      (count, x) => x < 0 ? count + 1 : count,
      0,
    ),
  };
};

const label = (i: number) => {
  if (i > 0) {
    return "increased";
  }
  if (i < 0) {
    return "decreased";
  }
  return "---------";
};

const formatReading = (reading: number, differential: number) => {
  return `${reading} (${label(differential)})`;
};

const formatReadings = (readings: number[], differentials: number[]) => {
  return readings
    .map((x, i) => formatReading(x, differentials[i]))
    .join("\n");
};

const main = async (args: string[]) => {
  const [filename = "readings"] = args;
  const readings = await getReadings(filename);
  const differentials = readings.map(
    (_, i, arr) => arr[i] - arr[i - 1],
  );
  const totals = calculateTotals(readings, differentials);

  console.log(formatReadings(readings, differentials));
  console.log();
  console.log(
    Object.entries(totals).map(([key, val]) => `${key}: ${val}`).join("\n"),
  );
};

main(Deno.args).then(() => Deno.exit(0)).catch((error) => {
  console.error(error);
  Deno.exit(1);
});
