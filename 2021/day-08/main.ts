import { __dirname, readFile } from "../lib/fs.ts";

interface Message {
  key: string[];
  output: string[];
}

export const parse = (str: string): Message[] => {
  return str.split("\n").reduce<Message[]>((records, line) => {
    const [keys, digits] = line.split("|");
    records.push({
      key: keys.split(" "),
      output: digits.split(" "),
    });
    return records;
  }, []);
};

export const unique: Record<number, number> = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

export const calculate = (records: Message[]) => {
  return records.reduce(
    (sum, { output }) =>
      sum +
      output.reduce((sum, digit) => unique[digit.length] ? sum + 1 : sum, 0),
    0,
  );
};

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const records = parse(input);
  console.log("📻", calculate(records));
};
