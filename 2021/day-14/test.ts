import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { count, parse, score } from "./lib.ts";

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

Deno.test("ten steps", () => {
  assertEquals(score(count(parse(input), 10)), 1588);
});

Deno.test("forty steps", () => {
  assertEquals(score(count(parse(input), 40)), 2188189693529);
});
