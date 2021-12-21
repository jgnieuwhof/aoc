import {
  green,
  red,
  white,
  yellow,
} from "https://deno.land/x/nanocolors@0.1.12/mod.ts";

type Square = { height: number; low: boolean };
type HeightMap = Square[][];

export const risk = (square: Square) => square.low ? square.height + 1 : 0;

export const createSquare = (height: string): Square => {
  return {
    height: +height,
    low: false,
  };
};

export const parse = (input: string): HeightMap => {
  return input.split("\n").filter(Boolean).map((line) =>
    line.split("").map(createSquare)
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

export const calculateLowPoints = (map: HeightMap): HeightMap => {
  return map.map((row, y) =>
    row.map((square, x) => ({
      ...square,
      low: isLowPoint(x, y, map),
    }))
  );
};

export const calculateRisk = (map: HeightMap): number => {
  return map.reduce(
    (sum, row) =>
      sum + row.reduce(
        (sumR, square) => sumR + risk(square),
        0,
      ),
    0,
  );
};
