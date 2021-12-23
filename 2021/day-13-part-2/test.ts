import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { applyFolds, count, createGrid, parse, printGrid } from "./lib.ts";

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0
fold along y=7 fold along x=5`;

Deno.test("everything", () => {
  const { folds, points } = parse(input);
  const grid = createGrid(points);
  const folded = applyFolds(folds, grid);
  assertEquals(
    printGrid(folded),
    `#####\n#...#\n#...#\n#...#\n#####\n.....\n.....`,
  );
  assertEquals(
    count(folded),
    16,
  );
  console.log("\n" + printGrid(folded, { fancy: true }));
});
