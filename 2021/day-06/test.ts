import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { parseSchool, simulate } from "./main.ts";

const input = "3,4,3,1,2";
const school = parseSchool(input);

Deno.test("06 [parseSchool]", () => {
  assertEquals(school, [3, 4, 3, 1, 2].map((n) => ({ timer: n })));
});

Deno.test("06 [18]", () => {
  const newSchool = simulate(school, 18);
  assertEquals(newSchool.length, 26);
  assertEquals(newSchool.map((x) => x.timer), [
    6,
    0,
    6,
    4,
    5,
    6,
    0,
    1,
    1,
    2,
    6,
    0,
    1,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    6,
    7,
    8,
    8,
    8,
    8,
  ]);
});

Deno.test("06 [80]", () => {
  assertEquals(simulate(school, 80).length, 5934);
});
