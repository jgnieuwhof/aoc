import { notEmpty } from "../lib/string.ts";

type Rules = Record<string, string>;

interface Instructions {
  polymer: string;
  rules: Rules;
}

type Count = Record<string, number>;

type Cache = Record<string, Record<number, Count>>;

export const parse = (input: string): Instructions => {
  const lines = input.split("\n").filter(notEmpty);
  return {
    polymer: lines[0],
    rules: lines.slice(1).map(
      (line) => line.split(" -> "),
    ).reduce<Rules>((rules, [pair, element]) => {
      rules[pair] = element;
      return rules;
    }, {}),
  };
};

const mergeCounts = (...counts: Count[]): Count => {
  const merged: Count = {};
  for (const count of counts) {
    for (const [element, n] of Object.entries(count)) {
      merged[element] ??= 0;
      merged[element] += n;
    }
  }
  return merged;
};

const recurse = (
  rules: Rules,
  depth: number,
  maxDepth: number,
  cache: Cache = {},
) =>
  (pair: string): Count => {
    if (!rules[pair] || depth === maxDepth) {
      return { [pair[0]]: 1 };
    }

    if (cache[pair]?.[depth]) {
      return cache[pair][depth];
    }

    const children = [pair[0] + rules[pair], rules[pair] + pair[1]];

    const count = mergeCounts(
      ...children.map(recurse(rules, depth + 1, maxDepth, cache)),
    );
    (cache[pair] ??= {})[depth] = count;
    return count;
  };

export const count = (
  { polymer, rules }: Instructions,
  n: number,
): Count => {
  return Array.from({ length: polymer.length - 1 })
    .map((_, i) => polymer[i] + polymer[i + 1])
    .map(recurse(rules, 0, n))
    .reduce<Count>(
      (acc, count) => mergeCounts(acc, count),
      { [polymer[polymer.length - 1]]: 1 },
    );
};

const stats = (numbers: number[]) => {
  return numbers.reduce(([min, max], n) => [
    Math.min(min, n),
    Math.max(max, n),
  ], [Infinity, 0]);
};

export const score = (count: Count): number => {
  const [min, max] = stats(Object.values(count));
  return max - min;
};
