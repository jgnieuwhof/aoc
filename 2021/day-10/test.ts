import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { answer, check } from "./lib.ts";

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
  assertEquals(answer(lines.map(check)), 26397);
});
