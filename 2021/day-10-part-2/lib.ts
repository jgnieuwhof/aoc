type Opener = "[" | "{" | "(" | "<";
type Closer = "]" | "}" | ")" | ">";
type Completion = Closer[];

interface Result {
  success: boolean;
  expected?: Closer;
  found?: string;
  incomplete?: Opener[];
}

const PAIRS: [Opener, Closer][] = [
  ["[", "]"],
  ["(", ")"],
  ["{", "}"],
  ["<", ">"],
];

const OPENERS = PAIRS.map(([opener]) => opener);

const CLOSERS = PAIRS.map(([_, closer]) => closer);

const SCORES: Record<Closer, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const notUndefinedOrNull = <T>(x: T | null | undefined): x is T =>
  x !== null && x !== undefined;

const isCloser = (str: string) => CLOSERS.includes(str as any);

const isOpener = (str: string) => OPENERS.includes(str as any);

const closer = (opener: Opener | undefined): Closer | undefined => {
  return PAIRS.find(([opener2]) => opener2 === opener)?.[1];
};

const last = (stack: Opener[]): Opener => {
  return stack.slice(-1)[0];
};

export const check = (line: string): Result => {
  const stack: Opener[] = [];

  for (const character of line.split("").filter((x) => x !== " ")) {
    const expected = closer(last(stack));

    if (isCloser(character) && character !== expected) {
      return { success: false, expected, found: character as Closer };
    }

    if (isOpener(character)) {
      stack.push(character as Opener);
      continue;
    }

    if (isCloser(character)) {
      stack.pop();
      continue;
    }

    return { success: false, expected, found: character };
  }

  return { success: true, incomplete: stack };
};

export const complete = (result: Result): Completion => {
  if (!result.success || !result.incomplete) {
    return [];
  }

  return result.incomplete?.concat([])
    .reverse()
    .map(closer)
    .filter(notUndefinedOrNull);
};

export const score = (completion: Completion) => {
  return completion.reduce((score, closer) => {
    return (score * 5) + SCORES[closer];
  }, 0);
};

export const answer = (completions: Completion[]): number => {
  const scores = completions
    .filter((c) => c.length)
    .map(score)
    .sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
};
