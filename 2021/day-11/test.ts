import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { parse, print, simulate } from "./lib.ts";

const small = `11111
  19991
  19191
  19991
  11111`;

const big = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

Deno.test("small", () => {
  const { grid, flashes } = simulate(parse(small), 2);

  console.log("\n");
  console.log(print(grid, { fancy: true }));

  assertEquals(
    print(grid),
    "45654\n51115\n61116\n51115\n45654",
  );
  assertEquals(flashes, 9);
});

Deno.test("big", () => {
  const { grid, flashes } = simulate(parse(big), 100);

  console.log("\n");
  console.log(print(grid, { fancy: true }));

  assertEquals(
    print(grid),
    "0397666866\n0749766918\n0053976933\n0004297822\n0004229892\n0053222877\n0532222966\n9322228966\n7922286866\n6789998766",
  );
  assertEquals(flashes, 1656);
});
