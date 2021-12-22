import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { answer, check, complete } from "./lib.ts";

const input = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;
const lines = input.split("\n");

Deno.test("everything", () => {
  assertEquals(
    answer(lines.map(check).map(complete)),
    288957,
  );
});
