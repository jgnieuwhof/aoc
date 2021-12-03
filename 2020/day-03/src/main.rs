use lib;

fn print_grid(grid: &Vec<Vec<bool>>) {
    let width = grid[0].len();

    for (y, row) in grid.iter().enumerate() {
        for (x, &col) in row.iter().enumerate() {
            if x == (y * 3) % width {
                print!("{}", if col { "X" } else { "O" });
            } else {
                print!("{}", if col { "#" } else { "." });
            }
        }
        print!("\n");
    }
}

fn hits_misses(grid: &Vec<Vec<bool>>) -> (i32, i32) {
    let width = grid[0].len();

    let mut hits = 0;
    let mut misses = 0;

    for y in 0..grid.len() {
        let x = y * 3;

        if grid[y][x % width] {
            hits = hits + 1;
        } else {
            misses = misses + 1;
        }
    }

    return (hits, misses);
}

fn main() {
    let lines = lib::file_to_vector("day-03/input.txt");
    let grid = lines
        .iter()
        .map(|l| l.chars().map(|c| c == '#').collect())
        .collect::<Vec<Vec<bool>>>();
    let (hits, misses) = hits_misses(&grid);

    print_grid(&grid);
    println!("h {} m {}", hits, misses);
}
