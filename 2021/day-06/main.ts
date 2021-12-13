import { __dirname, readFile } from "../lib/fs.ts";

interface Fish {
  timer: number;
}

type School = Fish[];

const birth = (): Fish => ({ timer: 8 });

const pregnancies = (school: School): number => {
  return school.reduce(
    (sum, fish) => sum + (fish.timer === 0 ? 1 : 0),
    0,
  );
};

const fishDay = ({ timer, ...fish }: Fish): Fish => ({
  ...fish,
  timer: timer === 0 ? 6 : timer - 1,
});

export const parseSchool = (str: string): School => {
  return str.split(",").map((x) => ({
    timer: +x,
  }));
};

export const simulate = (school: School, days = 10): School => {
  return Array.from({ length: days }).reduce<School>((school) => {
    const babies = Array.from({ length: pregnancies(school) }).map(birth);
    return school.map<Fish>(fishDay).concat(babies);
  }, school);
};

export const main = async () => {
  const input = await readFile(__dirname(import.meta.url), "input.txt");
  const school = parseSchool(input);
  console.log(`🐟 at t = 80 : ${simulate(school, 256).length}`);
};
