import { __dirname, readFile } from "../lib/fs.ts";

interface Message {
  key: Set<Wire>[];
  output: Wire[][];
}

/**
 *  aaaa
 * b    c
 * b    c
 *  dddd
 * e    f
 * e    f
 *  gggg
 */
type Wire = "a" | "b" | "c" | "d" | "e" | "f" | "g";
type WireMapping = Record<Wire, Wire>;
type Guesses = Record<Wire, Set<Wire>>;

const SEGMENTS: { n: number; segments: Wire[] }[] = [
  { n: 0, segments: ["a", "b", "c", "e", "f", "g"] },
  { n: 1, segments: ["c", "f"] },
  { n: 2, segments: ["a", "c", "d", "e", "g"] },
  { n: 3, segments: ["a", "c", "d", "f", "g"] },
  { n: 4, segments: ["b", "c", "d", "f"] },
  { n: 5, segments: ["a", "b", "d", "f", "g"] },
  { n: 6, segments: ["a", "b", "d", "e", "f", "g"] },
  { n: 7, segments: ["a", "c", "f"] },
  { n: 8, segments: ["a", "b", "c", "d", "e", "f", "g"] },
  { n: 9, segments: ["a", "b", "c", "d", "f", "g"] },
];

export const parse = (str: string): Message[] => {
  return str.split("\n").reduce<Message[]>((records, line) => {
    const [keys, digits] = line.split("|");
    records.push({
      key: keys.split(" ").filter(Boolean).map((x) =>
        new Set(x.split("").sort() as Wire[])
      ),
      output: digits.split(" ").filter(Boolean).map((x) =>
        x.split("") as Wire[]
      ),
    });
    return records;
  }, []);
};

const findUnique = (message: Message) => {
  const one = message.key.find((key) => key.size === 2)!;
  const seven = message.key.find((key) => key.size === 3)!;
  const four = message.key.find((key) => key.size === 4)!;
  const eight = message.key.find((key) => key.size === 7)!;
  return { one, four, seven, eight };
};

const findNonUnique = (guesses: Guesses, message: Message) => {
  const twoThreeFive = message.key.filter((key) => key.size === 5);
  const zeroSixNine = message.key.filter((key) => key.size === 6);

  const three = twoThreeFive.find((x) =>
    [...guesses["c"]].every((wire) => x.has(wire))
  )!;
  const five = twoThreeFive.find((x) =>
    [...guesses["b"]].every((wire) => x.has(wire))
  )!;
  const zero = zeroSixNine.find((x) =>
    [...guesses["d"]].some((wire) => !x.has(wire))
  )!;
  const nine = zeroSixNine.find((x) =>
    x !== zero && [...guesses["c"]].every((wire) => x.has(wire))
  )!;

  return {
    zero,
    two: twoThreeFive.find((x) => x !== three && x !== five)!,
    three,
    five,
    six: zeroSixNine.find((x) => x !== zero && x !== nine)!,
    nine,
  };
};

const findUnused = (number: Set<Wire>, guesses: Guesses) => {
  const unused = [...number].filter((wire) =>
    Object.values(guesses).every((segment) => !segment.has(wire))
  );

  if (unused.length > 1) {
    throw new Error(`Number ${number} is not constrained!`);
  }

  return unused[0];
};

const assertDecoded = (guesses: Guesses): void => {
  if (Object.values(guesses).some((x) => x.size > 1)) {
    throw new Error("Ruh roh!");
  }

  Object.entries(guesses).forEach(([key1, val1]) => {
    Object.entries(guesses).filter(([key2]) => key1 !== key2).forEach(
      ([_, val2]) => {
        if ([...val1][0] === [...val2][0]) {
          throw new Error("Ruh ruh roh!");
        }
      },
    );
  });
};

const getWire = (segment: Wire, guesses: Guesses): Wire => {
  return [...guesses[segment]][0] as Wire;
};

const mapWires = (message: Message): WireMapping => {
  const guesses = {
    "a": new Set<Wire>(),
    "b": new Set<Wire>(),
    "c": new Set<Wire>(),
    "d": new Set<Wire>(),
    "e": new Set<Wire>(),
    "f": new Set<Wire>(),
    "g": new Set<Wire>(),
  };

  const { one, four, seven } = findUnique(message);

  // one gives options for segments 2 and 5
  one.forEach((wire) => {
    guesses["c"].add(wire);
    guesses["f"].add(wire);
  });

  // seven gives segment 0
  guesses["a"].add(
    [...seven].find((wire) => !guesses["c"].has(wire))!,
  );

  // four gives options for segments 1 and 3
  [...four].filter((wire) => !guesses["c"].has(wire)).forEach(
    (wire) => {
      guesses["b"].add(wire);
      guesses["d"].add(wire);
    },
  );

  const { two, three, six, nine } = findNonUnique(
    guesses,
    message,
  );

  // nine gives segment 6
  guesses["g"].add(findUnused(nine, guesses));

  // six gives segment 4
  guesses["e"].add(findUnused(six, guesses));

  // two gives segments 2 and 5
  const seg2 = [...guesses["c"]].find((wire) => two.has(wire))!;
  const seg5 = [...guesses["f"]].find((wire) => wire !== seg2)!;
  guesses["c"].delete(seg5);
  guesses["f"].delete(seg2);

  // three gives segments 1 and 3
  const seg3 = [...guesses["d"]].find((wire) => three.has(wire))!;
  const seg1 = [...guesses["b"]].find((wire) => wire !== seg3)!;
  guesses["d"].delete(seg1);
  guesses["b"].delete(seg3);

  // ensure we've actually solved it
  assertDecoded(guesses);

  return {
    [getWire("a", guesses)]: "a",
    [getWire("b", guesses)]: "b",
    [getWire("c", guesses)]: "c",
    [getWire("d", guesses)]: "d",
    [getWire("e", guesses)]: "e",
    [getWire("f", guesses)]: "f",
    [getWire("g", guesses)]: "g",
  } as WireMapping;
};

const decodeNumber = (key: Wire[], mapping: WireMapping) => {
  const mapped = new Set(
    key.map((input) => mapping[input]),
  );
  const matches = SEGMENTS.filter(({ segments }) =>
    segments.length === mapped.size &&
    segments.every((segment) => mapped.has(segment as Wire))
  );
  if (matches.length != 1) {
    console.error({ key, mapped, mapping, matches, SEGMENTS });
    throw new Error(`Invalid number!`);
  }
  return matches[0].n;
};

const decodeMessage = (
  message: Message,
  mapping: WireMapping,
): number => {
  return +(message.output.map((key) => decodeNumber(key, mapping)).join(""));
};

export const decode = (message: Message) => {
  const mapping = mapWires(message);
  return decodeMessage(message, mapping);
};

export const sum = (numbers: number[]) =>
  numbers.reduce((sum, n) => sum + n, 0);

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const decoded = parse(input).map(decode);
  console.log(`🌟 ${sum(decoded)} 🌟`);
};
