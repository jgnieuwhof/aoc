import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { count, parseSchool, simulate } from "./main.ts";

const input = "3,4,3,1,2";
const school = parseSchool(input);

Deno.test("06 [parseSchool]", () => {
  assertEquals(school, [0, 1, 1, 2, 1, 0, 0, 0, 0]);
});

Deno.test("06 [18]", () => {
  const newSchool = simulate(school, 18);
  assertEquals(count(newSchool), 26);
});

Deno.test("06 [80]", () => {
  assertEquals(count(simulate(school, 80)), 5934);
});

Deno.test("06 [256]", () => {
  assertEquals(count(simulate(school, 256)), 26984457539);
});
