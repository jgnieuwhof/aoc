import { __dirname, readLines } from "../lib/fs.ts";

export type Coordinate = [number, number];

export type Line = [Coordinate, Coordinate];

export type Square = {
  count: number;
};

export type Grid = Square[][];

const parseCoordinate = (str: string): Coordinate => {
  const [x, y] = str.split(",").map((x) => +x);
  return [x, y];
};

export const parseCoordinates = (lines: string[]): Line[] => {
  return lines.filter((line) => !!line).map((line) => {
    const parts = line.split(" -> ");
    return [
      parseCoordinate(parts[0]),
      parseCoordinate(parts[1]),
    ];
  });
};

const calculateDimensions = (lines: Line[]): { x: number; y: number } => {
  const x = lines.reduce((max, [[x1], [x2]]) => Math.max(x1, x2, max), 0);
  const y = lines.reduce(
    (max, [[_x1, y1], [_x2, y2]]) => Math.max(y1, y2, max),
    0,
  );
  return { x, y };
};

export const createGrid = (lines: Line[]): Grid => {
  const { x, y } = calculateDimensions(lines);
  const grid: Grid = Array.from({ length: y + 1 }).map<Square[]>(() =>
    Array.from({ length: x + 1 }).map<Square>(() => ({ count: 0 }))
  );
  return grid;
};

export const printGrid = (grid: Grid): string => {
  return grid.map((row) => row.map((square) => `${square.count}`).join(" "))
    .join("\n");
};

const calculateSlope = (line: Line): number => {
  const [[x1, y1], [x2, y2]] = line;
  return (y2 - y1) / (x2 - x1);
};

export const fillGrid = (lines: Line[], _grid: Grid): Grid => {
  const grid = _grid.map((_line) => _line.concat([]));

  for (const line of lines) {
    const [[x1, y1], [x2, y2]] = line;
    const slope = calculateSlope([[x1, y1], [x2, y2]]);

    if (Math.abs(slope) === Infinity) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        grid[y][x1].count++;
      }
    }

    if (slope === 0) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        grid[y1][x].count++;
      }
    }
  }

  return grid;
};

export const calculateAnswer = (grid: Grid): number => {
  return grid.reduce(
    (sum, row) =>
      sum + row.reduce((sumL, square) => sumL + (square.count >= 2 ? 1 : 0), 0),
    0,
  );
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");
  const coordinates = parseCoordinates(lines);
  const grid = createGrid(coordinates);
  const filled = fillGrid(coordinates, grid);

  console.log(`answer: ${calculateAnswer(filled)}`);
};
