use lib;

struct Rule {
  positions: (usize, usize),
  letter: char,
}

fn parse_line (line: &String) -> (Rule, String) {
  let parts = line.split_whitespace().collect::<Vec<&str>>();

  let positions = parts[0]
    .split("-")
    .map(|l| l.parse::<usize>().unwrap_or(0))
    .collect::<Vec<usize>>();

  let letter = parts[1]
    .split_at(parts[1].len() - 1)
    .0
    .chars()
    .nth(0)
    .unwrap();

  let password = parts[2].to_string();

  return (
    Rule {
      letter,
      positions: (positions[0] - 1, positions[1] - 1),
    },
    password,
  )
}

fn validate_password (rule: &Rule, password: &String) -> bool {
  let char1 = password.chars().nth(rule.positions.0).unwrap_or_default();
  let char2 = password.chars().nth(rule.positions.1).unwrap_or_default();

  return (char1 == rule.letter) ^ (char2 == rule.letter);
}

fn main() {
  let lines = lib::file_to_vector("day-02/input.txt");

  let valid = lines
    .iter()
    .map(|l| parse_line(l))
    .filter(|(rule, password)| validate_password(rule, password));

  println!("Valid passwords: {}", valid.count());
}
