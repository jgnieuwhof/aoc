export type Direction = "forward" | "up" | "down";

export interface Command {
  direction: Direction;
  units: number;
}

export interface State {
  aim: number;
  horizontal: number;
  depth: number;
}
