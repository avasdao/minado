use std::str::FromStr;
// use secp256k1::{PublicKey, SecretKey};
use hex_literal::hex;
use sha2::{Sha256, Sha512, Digest};

pub fn test_shnorr() {
    let message = "Arik is rolling his own crypto";
    let sk = secp256k1::SecretKey::from_str("e5d5ca46ab3fe61af6a001e02a5b979ee2c1f205c94804dd575aa6134de43ab3").unwrap();
    let signature = rust_schnorr::sign_message(&sk, &message);

    println!("\nSignature: {:?}", signature);
}

pub fn test_sha256() {
    let base2: i32 = 2;
    let total_size = base2.pow(24);
    let mut data = vec![0u8;total_size as usize];
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    println!("\nSHA-256 before write: {:x}", result);    
}
