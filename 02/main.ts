import { Command, Direction, Position } from "./types.ts";
import { __dirname, readLines } from "../lib/fs.ts";

const calculatePosition = (
  [horizontal, depth]: Position,
  { direction, units }: Command,
): Position => {
  switch (direction) {
    case "forward":
      return [horizontal + units, depth];
    case "up":
      return [horizontal, depth - units];
    case "down":
      return [horizontal, depth + units];
    default:
      return [horizontal, depth];
  }
};

const formatPosition = ([horizontal, depth]: Position) => {
  return `h (${horizontal}) d (${depth}) x (${horizontal * depth})`;
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "course");

  const course = lines
    .map((line) => line.split(" "))
    .map<Command>((x) => ({
      direction: x[0] as Direction,
      units: parseInt(x[1]),
    }));

  const finalPosition = course.reduce<Position>(
    (position, command) => calculatePosition(position, command),
    [0, 0],
  );

  console.log(`🚢 ${formatPosition(finalPosition)}`);
};
