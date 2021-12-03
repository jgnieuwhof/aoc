use lib;

fn main() {
  let lines = lib::file_to_vector("day-01/input.txt");
  let nums = lines.iter().map(|l| l.parse().unwrap_or(0)).collect::<Vec<i32>>();

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