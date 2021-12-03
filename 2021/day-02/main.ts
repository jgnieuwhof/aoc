import { Command, Direction, State } from "./types.ts";
import { __dirname, readLines } from "../lib/fs.ts";

const calculateState = (
  { aim, horizontal, depth }: State,
  { direction, units }: Command,
): State => {
  switch (direction) {
    case "up":
      return { horizontal, depth, aim: aim - units };
    case "down":
      return { horizontal, depth, aim: aim + units };
    case "forward":
      return {
        aim,
        horizontal: horizontal + units,
        depth: depth + (aim * units),
      };
    default:
      return { aim, horizontal, depth };
  }
};

const formatState = ({ aim, horizontal, depth }: State) => {
  return `a (${aim}) h (${horizontal}) d (${depth}) x (${horizontal * depth})`;
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "course");

  const commands = lines
    .map((line) => line.split(" "))
    .map<Command>((x) => ({
      direction: x[0] as Direction,
      units: parseInt(x[1]),
    }));

  const finalState = commands.reduce<State>(
    (state, command) => calculateState(state, command),
    { aim: 0, horizontal: 0, depth: 0 },
  );

  console.log(`🚢 ${formatState(finalState)}`);
};
