use lib;

fn print_grid(grid: &Vec<Vec<bool>>, slope: f32) -> Vec<&str> {
    let width = grid[0].len();
    let reverse = slope < 1.0;
    let r_slope = if reverse { 1.0 / slope } else { slope } as usize;

    let mut result: Vec<&str> = [].to_vec();

    for (y, row) in grid.iter().enumerate() {
        for (x, &col) in row.iter().enumerate() {
            let is_skiier = if reverse {
                x * r_slope == y % (r_slope * width)
            } else {
                x == (y * r_slope) % width
            };

            if is_skiier {
                result.push(if col { "X" } else { "O" });
            } else {
                result.push(if col { "#" } else { "." })
            }
        }
        result.push("\n");
    }

    return result;
}

#[derive(Clone)]
struct Result {
    slope: f32,
    hits: usize,
    misses: usize,
}

fn calculate(grid: &Vec<Vec<bool>>, slope: f32) -> Result {
    let height = grid.len();
    let width = grid[0].len();

    let reverse = slope < 1.0;
    let r_slope = if reverse { 1.0 / slope } else { slope } as usize;
    let primary_edge = if reverse {
        (height as f32 * slope).ceil() as usize
    } else {
        height
    };

    let mut hits = 0;
    let mut misses = 0;

    for mut y in 0..primary_edge {
        let mut x = y * r_slope;

        if reverse {
            let a = y;
            y = x;
            x = a;
        }

        if grid[y][x % width] {
            hits = hits + 1;
        } else {
            misses = misses + 1;
        }
    }

    return Result {
        slope,
        hits,
        misses,
    };
}

fn main() {
    let lines = lib::file_to_vector("day-03/input.txt");
    let grid = lines
        .iter()
        .map(|l| l.chars().map(|c| c == '#').collect())
        .collect::<Vec<Vec<bool>>>();

    let slopes = [1.0, 3.0, 5.0, 7.0, 0.5];
    let results = slopes.map(|a| calculate(&grid, a));

    let total = results
        .clone()
        .into_iter()
        .map(|result| result.hits)
        .reduce(|product, hits| product * hits)
        .unwrap();

    for slope in slopes {
        println!("{}", print_grid(&grid, slope).join(""));
    }
    for result in results {
        println!("s {} h {} m {}", result.slope, result.hits, result.misses)
    }
    println!();
    println!("total {}", total);
}
