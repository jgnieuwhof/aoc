import { SetById } from "../lib/set.ts";
import { isUppercase, lines, notEmpty } from "../lib/string.ts";
import type { Optional } from "../lib/types.ts";

interface Cave {
  id: string;
  tunnels: Set<Cave>;
}

interface CaveSystem {
  start: Cave;
  end: Cave;
  caves: Set<Cave>;
  tunnels: SetById<Cave>;
}

type Path = Cave[];

const createCave = ({
  id,
  tunnels = new Set([]),
}: Optional<Cave, "tunnels">): Cave => {
  return {
    id,
    tunnels,
  };
};

const createCaveSystem = (): CaveSystem => {
  const start = createCave({ id: "start" });
  const end = createCave({ id: "end" });
  return {
    start,
    end,
    caves: new Set([start, end]),
    tunnels: new SetById(),
  };
};

const findCave = (id: string, system: CaveSystem): Cave | undefined => {
  return [...system.caves].find((cave) => cave.id === id);
};

const findOrCreateCave = (id: string, system: CaveSystem): Cave => {
  const cave = findCave(id, system) ?? createCave({ id });
  if (!system.caves.has(cave)) {
    system.caves.add(cave);
  }
  return cave;
};

const createTunnel = (ids: [string, string], system: CaveSystem) => {
  const [caveOne, caveTwo] = ids.map((id) => findOrCreateCave(id, system));
  caveOne.tunnels.add(caveTwo);
  caveTwo.tunnels.add(caveOne);
  system.tunnels.add([caveOne, caveTwo]);
};

export const parse = (input: string): CaveSystem => {
  const system = createCaveSystem();
  for (const line of lines(input)) {
    const [idOne, idTwo] = line.split("-").filter(notEmpty);
    createTunnel([idOne, idTwo], system);
  }
  return system;
};

export const printCaves = (caves: Cave[]) => {
  return caves.map((c) => c.id).join(", ");
};

const printTunnels = (system: CaveSystem) => {
  return [...system.tunnels]
    .map((caves) => caves.map((x) => x.id))
    .map((ids) => ids.join("-"))
    .map((x) => `\t${x}`)
    .join("\n");
};

export const print = (system: CaveSystem): string => {
  return `caves: ${printCaves([...system.caves])}\ntunnels:\n${
    printTunnels(system)
  }`;
};

const isStart = (cave: Cave) => cave.id === "start";

const isEnd = (cave: Cave) => cave.id === "end";

const isBig = (cave: Cave) => isUppercase(cave.id);

const isSmall = (cave: Cave) => !isBig(cave);

const maxVisits = (cave: Cave, special: Cave) => {
  return cave === special ? 2 : 1;
};

const spelunk = (path: Path, special: Cave): Path[] => {
  const current = path.slice(-1)[0];

  if (isEnd(current)) {
    return [path];
  }

  return [...current.tunnels]
    .filter(
      (cave) =>
        isBig(cave) ||
        path.filter((c) => cave.id === c.id).length <
          maxVisits(cave, special),
    )
    .flatMap((cave) => spelunk([...path, cave], special));
};

export const pathfind = (system: CaveSystem): Path[] => {
  const paths = [...system.caves]
    .filter((cave) => isSmall(cave) && !isStart(cave) && !isEnd(cave))
    .flatMap((special) => spelunk([system.start], special))
    .reduce<Record<string, Path>>((set, path) => {
      set[printCaves(path)] ??= path;
      return set;
    }, {});
  return Object.values(paths);
};
