use std::io::Write;
use std::{thread, time};

// use termcolor::{BufferWriter, Color, ColorChoice, ColorSpec, WriteColor};
use termcolor::{Color, ColorChoice, ColorSpec, StandardStream, WriteColor};

/**
 * Sleep
 *
 * Delay code execution for the time requested.
 */
pub fn sleep(dur: u64) {
    let ten_millis = time::Duration::from_millis(dur);
    let now = time::Instant::now();

    thread::sleep(ten_millis);

    assert!(now.elapsed() >= ten_millis);
}

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

pub fn c_print(msg: String, color: Color) {
    // let mut bufwtr = BufferWriter::stderr(ColorChoice::Always);
    // let mut buffer = bufwtr.buffer();
    // buffer.set_color(ColorSpec::new().set_fg(Some(color)));
    // // writeln!(&mut buffer, msg.to_string());
    // println!("{}", msg);
    // bufwtr.print(&buffer);

    let mut stdout = StandardStream::stdout(ColorChoice::Always);
    stdout.set_color(ColorSpec::new().set_fg(Some(color)));
    writeln!(&mut stdout, "what color is this?");
    // println!("{}", msg);
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
