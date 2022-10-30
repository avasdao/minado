use std::io;
use std::io::Write;
use std::process;

use termcolor::{Color};

mod crypto;
mod utils;

fn main() -> std::io::Result<()> {
    let username = "Simba";

    utils::welcome1();

    // crypto::test_sha256();
    crypto::test_shnorr();
    // process::exit(1);

    // print!("\n  {}", "Initializing your system. Please wait...");
    // io::stdout().flush();
    // sleep(2000);

    // print!("\n\n  {}", "Auto-detecting the location of your Nexa data directory...");
    // io::stdout().flush();
    // sleep(3000);

    // println!("\n\n  {}", "Found it!");
    // println!("  → {}{}{}", r"C:\Users\", username, r"\AppData\Roaming\nexa-data");
    // println!();

    // println!("  _______________________________________________________________________________\n");
    // println!("    Please enter your mining parameters below.");
    // println!("    Will this appear directly under?");
    // println!("  _______________________________________________________________________________");

    // println!("\n  {}", "Type (help) for a list of options.");

    // print!("\n  Enter your Nexa (destination) address: ");
    // io::stdout().flush();

    // let mut nexa_address = String::new();
    // io::stdin().read_line(&mut nexa_address);
    // let mut a: i32 = a.trim().parse().unwrap();
    // nexa_address = nexa_address.trim().parse().unwrap();

    // print!("\n  Where would you like your email alerts? (leave empty for no alerts): ");
    // io::stdout().flush();

    // let mut email_address = String::new();
    // io::stdin().read_line(&mut email_address);
    // email_address = email_address.trim().parse().unwrap();

    // print!("\n  Your Nexa address is     : {}", nexa_address);
    // println!("  Your email address is    : {}", email_address);

    // println!("  Okay, we're all set .. Let's GO!\n");

    // utils::c_print("C Print is working".to_string(), Color::Yellow);

    // utils::c_print(String::from("We all gonna make it!"), Color::Green);
    // utils::c_print(String::from("time to clear out the bad"), Color::Rgb(100, 0, 90));

    // crypto::test_shnorr();
    // crypto::test_sha256();

    Ok(())
}
