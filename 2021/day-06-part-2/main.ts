import { __dirname, readFile } from "../lib/fs.ts";

type School = number[];

const INFANCY = 2;
const TERM = 7;

const createSchool = (n = INFANCY + TERM) =>
  Array.from<number>({ length: n }).fill(0);

export const parseSchool = (str: string): School => {
  return str.split(",")
    .map((x) => +x)
    .reduce((school, fish) => {
      school[fish]++;
      return school;
    }, createSchool());
};

export const simulate = (school: School, days = 10): School => {
  return Array.from({ length: days }).reduce<School>((school) => {
    const newSchool = createSchool();
    for (let i = 0; i < INFANCY + TERM; i++) {
      newSchool[i] = school[(i + 1) % (INFANCY + TERM)];
      if (i === TERM - 1) {
        newSchool[i] += school[0];
      }
    }
    return newSchool;
  }, school);
};

export const count = (school: School): number => {
  return school.reduce((sum, n) => sum + n, 0);
};

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const school = parseSchool(input);
  console.log(`🐟 at t = 256 : ${count(simulate(school, 256))}`);
};
