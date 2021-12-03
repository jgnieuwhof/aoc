use lib;

fn main() {
  let lines = lib::file_to_vector("day-01/input.txt");
  let nums = lines.iter().map(|l| l.parse().unwrap_or(0)).collect::<Vec<i32>>();

  let mut combinations: Vec<(i32, i32)> = Vec::new();

  for i in 0..(nums.len() - 1) {
    let x = nums[i];
    for j in i..(nums.len() - 1) {
      let y = nums[j];

      if x + y == 2020 {
        combinations.push((x, y))
      }
    }
  }

  for (x, y) in combinations {
    println!("x ({}) y ({}) x * y ({})", x, y, x * y)
  }
}