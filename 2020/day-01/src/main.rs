use std::env;
use std::fs;

fn main() {
  let input_path = env::current_dir()
    .unwrap()
    .join("day-01/input.txt");
  let input = fs::read_to_string(input_path).unwrap();

  let mut combinations: Vec<(i32, i32)> = Vec::new();
  for l1 in input.lines() {
    let x: i32 = l1.parse().unwrap();

    for l2 in input.lines() {
      let y: i32 = l2.parse().unwrap();

      if x + y == 2020 {
        combinations.push((x, y))
      }
    }
  }

  for (x, y) in combinations {
    println!("x ({}) y ({}) x * y ({})", x, y, x * y)
  }
}