import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { calculate, parse } from "./main.ts";

const input = "16,1,2,0,4,2,7,1,2,14";
const crabs = parse(input);

Deno.test("07", () => {
  const { min, position } = calculate(crabs);
  assertEquals(min, 37);
  assertEquals(position, 2);
});
