import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { calculate, fuel, parse } from "./main.ts";

const input = "16,1,2,0,4,2,7,1,2,14";
const crabs = parse(input);

Deno.test("07 [fuel]", () => {
  assertEquals(fuel(1), 1);
  assertEquals(fuel(11), 66);
});

Deno.test("07", () => {
  const { min, position } = calculate(crabs);
  assertEquals(min, 168);
  assertEquals(position, 5);
});
