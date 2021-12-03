use lib;

fn collect_passports(lines: &Vec<String>) -> Vec<Vec<&str>> {
    let cleaned = lines
        .iter()
        .flat_map(|line| line.split(" "))
        .collect::<Vec<&str>>();

    let mut current: Vec<&str> = [].to_vec();
    let mut passports: Vec<Vec<&str>> = [].to_vec();

    for line in cleaned {
        if line.is_empty() {
            passports.push(current);
            current = [].to_vec();
        } else {
            current.push(line);
        }
    }

    return passports;
}

fn is_passport_valid(passport: &Vec<&str>) -> bool {
    let fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

    let mut missing: Vec<&str> = [].to_vec();

    for field in fields {
        if !passport.iter().any(|x| x.starts_with(field)) {
            missing.push(field);
        }
    }

    return missing.len() == 1 && missing[0] == "cid";
}

fn main() {
    let lines = lib::file_to_vector("day-04/input.txt");
    let passports = collect_passports(&lines);

    for passport in passports.clone() {
        println!("{}", passport.join(", "));
    }

    let total = passports.iter().fold(0, |sum, passport| {
        if is_passport_valid(&passport) {
            sum + 1
        } else {
            sum
        }
    });

    println!("\n{} valid passports", total)
}
