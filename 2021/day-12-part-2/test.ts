import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";

import { parse, pathfind, print, printCaves } from "./lib.ts";

const small = `A-start
b-start
A-c
A-b
b-d
A-end
b-end`;

const medium = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const large = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

Deno.test("small", () => {
  const system = parse(small);
  assertEquals(
    print(system),
    `caves: start, end, A, b, c, d\ntunnels:\n\tA-start\n\tb-start\n\tA-c\n\tA-b\n\tb-d\n\tA-end\n\tb-end`,
  );
  assertEquals(pathfind(system).length, 36);
});

Deno.test("medium", () => {
  assertEquals(pathfind(parse(medium)).length, 103);
});

Deno.test("large", () => {
  assertEquals(pathfind(parse(large)).length, 3509);
});
