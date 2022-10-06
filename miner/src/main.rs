use std::io;
use std::io::Write;
use std::process;

use termcolor::{Color};

mod crypto;
mod utils;

fn main() -> std::io::Result<()> {
    let username = "Simba";

    welcome3();
    crypto::test_sha256();
    // crypto::test_shnorr();
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


use std::{thread, time};

pub fn sleep(dur: u64) {
    let ten_millis = time::Duration::from_millis(dur);
    let now = time::Instant::now();
    
    thread::sleep(ten_millis);
    
    assert!(now.elapsed() >= ten_millis);
}

pub fn welcome1() {
    println!(r"
   _   _                  ____            _        _ 
  | \ | | _____  ____ _  |  _ \ ___   ___| | _____| |
  |  \| |/ _ \ \/ / _` | | |_) / _ \ / __| |/ / __| |
  | |\  |  __/>  < (_| | |  _ < (_) | (__|   <\__ \_|
  |_| \_|\___/_/\_\__,_| |_| \_\___/ \___|_|\_\___(_)
                    ____              __  __ _                 
                   |  _ \ _ __ ___   |  \/  (_)_ __   ___ _ __ 
                   | |_) | '__/ _ \  | |\/| | | '_ \ / _ \ '__|
                   |  __/| | | (_) | | |  | | | | | |  __/ |   
                   |_|   |_|  \___/  |_|  |_|_|_| |_|\___|_|   
                                       v20.9.30 (alpha)");
}

pub fn welcome2() {
    println!(r"

███╗   ██╗███████╗██╗  ██╗ █████╗     ██████╗  ██████╗  ██████╗██╗  ██╗███████╗██╗
████╗  ██║██╔════╝╚██╗██╔╝██╔══██╗    ██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██║
██╔██╗ ██║█████╗   ╚███╔╝ ███████║    ██████╔╝██║   ██║██║     █████╔╝ ███████╗██║
██║╚██╗██║██╔══╝   ██╔██╗ ██╔══██║    ██╔══██╗██║   ██║██║     ██╔═██╗ ╚════██║╚═╝
██║ ╚████║███████╗██╔╝ ██╗██║  ██║    ██║  ██║╚██████╔╝╚██████╗██║  ██╗███████║██╗
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝

       ██████╗ ██████╗  ██████╗     ███╗   ███╗██╗███╗   ██╗███████╗██████╗ 
       ██╔══██╗██╔══██╗██╔═══██╗    ████╗ ████║██║████╗  ██║██╔════╝██╔══██╗
       ██████╔╝██████╔╝██║   ██║    ██╔████╔██║██║██╔██╗ ██║█████╗  ██████╔╝
       ██╔═══╝ ██╔══██╗██║   ██║    ██║╚██╔╝██║██║██║╚██╗██║██╔══╝  ██╔══██╗
       ██║     ██║  ██║╚██████╔╝    ██║ ╚═╝ ██║██║██║ ╚████║███████╗██║  ██║
       ╚═╝     ╚═╝  ╚═╝ ╚═════╝     ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
                                               v20.9.30 (alpha)");
}

pub fn welcome3() {
    println!(r"


   ____     ___  __ __   ____      ____   ___     __  __  _  _____ __ 
  |    \   /  _]|  |  | /    |    |    \ /   \   /  ]|  |/ ]/ ___/|  |
  |  _  | /  [_ |  |  ||  o  |    |  D  )     | /  / |  ' /(   \_ |  |
  |  |  ||    _]|_   _||     |    |    /|  O  |/  /  |    \ \__  ||__|
  |  |  ||   [_ |     ||  _  |    |    \|     /   \_ |     \/  \ | __ 
  |  |  ||     ||  |  ||  |  |    |  .  \     \     ||  .  |\    ||  |
  |__|__||_____||__|__||__|__|    |__|\_|\___/ \____||__|\_| \___||__|
          ____  ____   ___       ___ ___  ____  ____     ___  ____  
         |    \|    \ /   \     |   |   ||    ||    \   /  _]|    \ 
         |  o  )  D  )     |    | _   _ | |  | |  _  | /  [_ |  D  )
         |   _/|    /|  O  |    |  \_/  | |  | |  |  ||    _]|    / 
         |  |  |    \|     |    |   |   | |  | |  |  ||   [_ |    \ 
         |  |  |  .  \     |    |   |   | |  | |  |  ||     ||  .  \
         |__|  |__|\_|\___/     |___|___||____||__|__||_____||__|\_|
                                            v20.9.30 (alpha)");
}
