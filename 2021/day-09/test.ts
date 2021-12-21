import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { calculateLowPoints, calculateRisk, parse, print } from "./lib.ts";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const map = calculateLowPoints(parse(input));

Deno.test("everything", () => {
  assertEquals(calculateRisk(map), 15);
  console.log(`\n${print(map)}`);
});
