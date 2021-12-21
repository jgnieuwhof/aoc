import {
  green,
  red,
  yellow,
} from "https://deno.land/x/nanocolors@0.1.12/mod.ts";

type Square = {
  x: number;
  y: number;
  height: number;
  low: boolean | undefined;
};
type HeightMap = Square[][];
type Basin = { square: Square; size: number };

const createSquare = (x: number, y: number, height: string): Square => {
  return {
    x,
    y,
    height: +height,
    low: undefined,
  };
};

export const parse = (input: string): HeightMap => {
  return input.split("\n").filter(Boolean).map((line, y) =>
    line.split("").map((height, x) => createSquare(x, y, height))
  );
};

export const print = (map: HeightMap): string => {
  const printSquare = (square: Square) => {
    const colour = square.low ? red : square.height < 9 ? yellow : green;
    return colour(square.height);
  };
  return map.map((row) => row.map(printSquare).join("")).join("\n");
};

const isLowPoint = (x: number, y: number, map: HeightMap): boolean => {
  for (let k = y - 1; k <= y + 1; k++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if ((k !== y || j !== x)) {
        if ((map[k]?.[j]?.height ?? Infinity) <= map[y][x].height) {
          return false;
        }
      }
    }
  }
  return true;
};

export const lowPoints = (map: HeightMap): HeightMap => {
  return map.map((row, y) =>
    row.map((square, x) => ({
      ...square,
      low: isLowPoint(x, y, map),
    }))
  );
};

const basinSize = (
  { x, y, height }: Square,
  map: HeightMap,
  seen: Set<string> = new Set(),
): number => {
  if (seen.has([x, y].toString()) || height === 9) {
    return 0;
  }

  seen.add([x, y].toString());

  return 1 +
    [
      [y - 1, x],
      [y, x - 1],
      [y, x + 1],
      [y + 1, x],
    ]
      .filter(([k, j]) => !!map[k]?.[j])
      .reduce(
        (size, [k, j]) => size + basinSize(map[k][j], map, seen),
        0,
      );
};

export const basins = (map: HeightMap): Basin[] => {
  return map
    .flatMap((row) => row)
    .filter((square) => square.low)
    .map((square) => ({ square, size: basinSize(square, map) }));
};

const largestBasins = (basins: Basin[]) => {
  return basins.sort((a, b) => b.size - a.size).slice(0, 3);
};

export const answer = (basins: Basin[]) => {
  return largestBasins(basins).reduce(
    (product, basin) => product * basin.size,
    1,
  );
};
