import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { answer, basins, lowPoints, parse, print } from "./lib.ts";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const map = lowPoints(parse(input));

Deno.test("everything", () => {
  console.log(`\n${print(map)}`);
  assertEquals(answer(basins(map)), 1134);
});
