export type Direction = "forward" | "up" | "down";

export interface Command {
  direction: Direction;
  units: number;
}

export type Position = [horizontal: number, depth: number];
