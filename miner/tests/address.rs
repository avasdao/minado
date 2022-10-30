/**
 * Address
 *
 * Test addresses.
 */
fn pass() {
    println!("\nStarting address tests..");

    pub mod bech32;

    let s = "split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w";

    let decode_result = bech32::Bech32::from_string(s.to_string());
    if !decode_result.is_ok() {
        panic!("Did not decode: {:?} Reason: {:?}", s, decode_result.unwrap_err());
    }
    assert!(decode_result.is_ok());

    let encode_result = decode_result.unwrap().to_string();
    assert!(encode_result.is_ok());

    assert_eq!(s.to_lowercase(), encode_result.unwrap().to_lowercase());

}
