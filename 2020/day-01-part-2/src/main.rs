use std::env;
use std::io::{BufRead, BufReader};
use std::fs::File;

fn main() {
  let input_path = env::current_dir()
    .unwrap()
    .join("day-01/input.txt");

  let reader = BufReader::new(
    File::open(input_path).expect("Unable to read file")
  );

  let nums: Vec<i32> = reader.lines().into_iter().map(|l| {
      l.unwrap().parse().unwrap_or(0)
  }).collect();

  let mut combinations: Vec<(i32, i32, i32)> = Vec::new();

  for i in 0..(nums.len() - 1) {
    let x = nums[i];
    for j in i..(nums.len() - 1) {
      let y = nums[j];
      for k in j..(nums.len() - 1) {
        let z = nums[k];
        if x + y + z == 2020 {
          combinations.push((x, y, z))
        }
      }
    }
  }

  for (x, y, z) in combinations {
    println!("x ({}) y ({}) z({}) x * y * z({})", x, y, z, x * y * z)
  }
}