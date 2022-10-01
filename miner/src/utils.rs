use std::io::Write;

// use termcolor::{BufferWriter, Color, ColorChoice, ColorSpec, WriteColor};
use termcolor::{Color, ColorChoice, ColorSpec, StandardStream, WriteColor};

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
