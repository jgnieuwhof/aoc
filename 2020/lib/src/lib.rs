use std::env;
use std::io::{BufRead, BufReader};
use std::fs::File;

pub fn file_to_vector(file: &str) -> Vec<String> {
  let input_path = env::current_dir()
    .unwrap()
    .join(file);

  let reader = BufReader::new(
    File::open(input_path).expect(&format!("Unable to read file"))
  );

  let lines: Vec<String> = reader
    .lines()
    .into_iter()
    .map(|l| l.unwrap())
    .collect();

  return lines;
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
