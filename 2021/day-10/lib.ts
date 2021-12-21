type Opener = "[" | "{" | "(" | "<";
type Closer = "]" | "}" | ")" | ">";

interface Result {
  success: boolean;
  expected?: Closer;
  found?: string;
}

const pairs: [Opener, Closer][] = [
  ["[", "]"],
  ["(", ")"],
  ["{", "}"],
  ["<", ">"],
];
const openers = pairs.map((x) => x[0]);
const closers = pairs.map((x) => x[1]);
const scores: Record<Closer, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const last = (stack: Opener[]): Opener => {
  return stack.slice(-1)[0];
};

export const check = (line: string): Result => {
  const stack: Opener[] = [];

  for (const character of line.split("").filter((x) => x !== " ")) {
    const expected = pairs.find(([opener, _]) => opener === last(stack))?.[1];

    if (closers.includes(character as Closer) && character !== expected) {
      return { success: false, expected, found: character as Closer };
    }

    if (openers.includes(character as Opener)) {
      stack.push(character as Opener);
      continue;
    }

    if (closers.includes(character as Closer)) {
      stack.pop();
      continue;
    }

    return { success: false, expected, found: character };
  }

  return { success: true };
};

export const answer = (results: Result[]): number => {
  return results
    .filter(({ success }) => success === false)
    .reduce(
      (sum, { found }) => sum + (scores[found as Closer] ?? 0),
      0,
    );
};
