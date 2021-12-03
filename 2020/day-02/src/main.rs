use lib;

struct Rule {
  min: i32,
  max: i32,
  letter: String,
}

fn validate_password (rule: &Rule, password: &String) -> bool {
  let mut count = 0;

  for char in password.chars() {
    if char.to_string() == rule.letter {
      count = count + 1;
    }
  }

  return count >= rule.min && count <= rule.max;
}

fn parse_line (line: String) -> (Rule, String) {
  let parts = line.split_whitespace().collect::<Vec<&str>>();

  let min_max = parts[0].split("-").collect::<Vec<&str>>();
  let min: i32 = min_max[0].parse().unwrap();
  let max: i32 = min_max[1].parse().unwrap();

  let letter = parts[1].split_at(parts[1].len() - 1).0.to_string();

  let password = parts[2].to_string();

  return (
    Rule { min, max, letter },
    password,
  )
}

fn main() {
  let lines = lib::file_to_vector("day-02/input.txt");

  let mut count = 0;
  for line in lines {
    let (rule, password) = parse_line(line);

    let is_valid = validate_password(&rule, &password);

    if is_valid {
      count = count + 1;
    }
  }

  println!("Valid passwords: {}", count);
}
