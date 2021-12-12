import { __dirname, readLines } from "../lib/fs.ts";

interface Square {
  n: number;
  called: boolean;
}

type Board = Square[][];

interface Result {
  winner: Board;
  n: number;
}

export const parseNumbers = (lines: string[]): number[] => {
  return lines[0].split(",").map((x) => +x);
};

export const parseBoards = (lines: string[]): Board[] => {
  return lines.slice(2).reduce<Board[]>((acc, line) => {
    if (line.length === 0) {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(
        line.split(" ").filter((x) => !!x).map((x) => ({
          n: +x,
          called: false,
        })),
      );
    }
    return acc;
  }, [[]]).filter((board) => board.length !== 0);
};

const pivot = (board: Board) => {
  return board.map((_, colIndex) => board.map((row) => row[colIndex]));
};

const dab = (n: number, board: Board): void => {
  for (const row of board) {
    for (const square of row) {
      if (square.n === n) {
        square.called = true;
      }
    }
  }
};

const checkRow = (row: Square[]) => row.every((square) => square.called);

export const check = (board: Board) => {
  const rows = board.map(checkRow).filter(Boolean);
  const columns = pivot(board).map(checkRow).filter(Boolean);

  return {
    rows,
    columns,
    won: !!rows.length || !!columns.length,
  };
};

export const play = (
  numbers: number[],
  boards: Board[],
): Result | undefined => {
  for (const n of numbers) {
    for (const board of boards) {
      dab(n, board);
      const { won } = check(board);
      if (won) {
        return { winner: board, n };
      }
    }
  }
};

const sumUnmarked = (board: Board) => {
  return board.reduce(
    (sum, row) =>
      sum +
      row.reduce((sumR, square) => square.called ? sumR : sumR + square.n, 0),
    0,
  );
};

export const calculateAnswer = ({ winner, n }: Result) => {
  return sumUnmarked(winner) * n;
};

export const main = async () => {
  const lines = await readLines(__dirname(import.meta.url), "input.txt");

  const numbers = parseNumbers(lines);
  const boards = parseBoards(lines);
  const result = play(numbers, boards);

  if (result) {
    const answer = calculateAnswer(result);
    console.log(`🥳 winner! ${answer}`);
  } else {
    console.log("😢 no winners here");
  }
};
