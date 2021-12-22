import { blue, cyan } from "https://deno.land/x/nanocolors@0.1.12/mod.ts";

type Axis = "x" | "y";
interface Fold {
  axis: Axis;
  n: number;
}
type Point = [number, number];
interface ParseResult {
  points: Point[];
  folds: Fold[];
}

type Square = boolean;
type Grid = Square[][];

interface PrintOptions {
  fancy: boolean;
}

export const parse = (input: string): ParseResult => {
  return input.split("\n").reduce<ParseResult>((result, line) => {
    if (line.includes(",")) {
      const [x, y] = line.split(",").map((n) => +n);
      result.points.push([x, y]);
    }

    if (line.includes("fold along")) {
      line.split(" ")
        .filter((token) => token.includes("="))
        .map((token) => token.split("="))
        .map<Fold>(([axis, n]) => ({
          axis: axis as Axis,
          n: +n,
        }))
        .forEach((fold) => result.folds.push(fold));
    }

    return result;
  }, { points: [], folds: [] });
};

const width = (points: Point[]) => {
  return Math.max(...points.map(([x]) => x)) + 1;
};

const height = (points: Point[]) => {
  return Math.max(...points.map(([_, y]) => y)) + 1;
};

const getPoint = (x: number, y: number, points: Point[]) => {
  return points.find(([j, k]) => j === x && k === y);
};

export const createGrid = (points: Point[]): Grid => {
  const column = Array.from({ length: height(points) });
  const row = Array.from({ length: width(points) });
  return column.map((_, y) => row.map((_, x) => !!getPoint(x, y, points)));
};

const dims = (grid: Grid) => {
  return {
    width: grid[0].length,
    height: grid.length,
  };
};

const printSquare = (square: Square, options?: PrintOptions) => {
  const colour = options?.fancy ? square ? cyan : blue : (x: string) => x;
  return square ? colour("#") : colour(".");
};

export const printGrid = (grid: Grid, options?: PrintOptions): string => {
  return grid.map(
    (row) => row.map((square) => printSquare(square, options)).join(""),
  ).join("\n");
};

const transpose = (axis: Axis, grid: Grid): Grid => {
  const { width, height } = dims(grid);
  return grid.map(
    (row, y) =>
      row.map(
        (_, x) =>
          grid[
            axis === "y" ? height - 1 - y : y
          ][
            axis === "x" ? width - 1 - x : x
          ],
      ),
  );
};

const merge = (gridOne: Grid, gridTwo: Grid): Grid => {
  if (
    dims(gridOne).width !== dims(gridTwo).width ||
    dims(gridOne).height !== dims(gridTwo).height
  ) {
    throw new Error(`Can only merge grids with equal dimensions!`);
  }

  return gridOne.map(
    (row, y) =>
      row.map(
        (square, x) => square || gridTwo[y][x],
      ),
  );
};

export const applyFold = (fold: Fold, grid: Grid): Grid => {
  const width = fold.axis === "x"
    ? Math.max(fold.n, dims(grid).width - fold.n - 1)
    : dims(grid).width;
  const height = fold.axis === "y"
    ? Math.max(fold.n, dims(grid).height - fold.n - 1)
    : dims(grid).height;

  const shouldTranspose = fold.n <
    Math.floor((fold.axis === "x" ? dims(grid).height : dims(grid).width) / 2);
  const transposed = shouldTranspose ? transpose(fold.axis, grid) : grid;

  const column = Array.from({ length: height });
  const row = Array.from({ length: width });

  const sectionOne = column.map((_, y) => row.map((_, x) => transposed[y][x]));
  const sectionTwo = column.map((_, y) =>
    row.map((_, x) =>
      fold.axis === "y"
        ? transposed[y + height + 1]?.[x] ?? false
        : transposed[y]?.[x + width + 1] ?? false
    )
  );

  return merge(sectionOne, transpose(fold.axis, sectionTwo));
};

export const applyFolds = (folds: Fold[], grid: Grid): Grid => {
  return folds.reduce(
    (folded, fold) => applyFold(fold, folded),
    grid,
  );
};

export const count = (grid: Grid) => {
  return grid.reduce(
    (sum, row) =>
      sum + row.reduce(
        (sum, square) => sum + (square ? 1 : 0),
        0,
      ),
    0,
  );
};
