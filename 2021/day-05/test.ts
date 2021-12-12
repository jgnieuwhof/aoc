import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import {
  calculateAnswer,
  createGrid,
  fillGrid,
  parseCoordinates,
} from "./main.ts";

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;
const lines = input.split("\n");

Deno.test("05 [parseCoordinates]", () => {
  assertEquals(
    parseCoordinates(lines).slice(0, 1)[0],
    [[0, 9], [5, 9]],
  );
  assertEquals(
    parseCoordinates(lines).slice(-1)[0],
    [[5, 5], [8, 2]],
  );
});

Deno.test("05", () => {
  const coordinates = parseCoordinates(lines);
  const grid = createGrid(coordinates);
  const filled = fillGrid(coordinates, grid);
  assertEquals(calculateAnswer(filled), 5);
});
