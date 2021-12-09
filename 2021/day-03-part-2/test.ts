import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { calculate } from "./main.ts";

Deno.test("calculate 1", () => {
  const lines = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  const { c02, oxygen } = calculate(lines);

  assertEquals(c02, 10);
  assertEquals(oxygen, 23);
});
