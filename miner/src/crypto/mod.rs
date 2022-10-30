use std::str::FromStr;
// use std::iter;
// use secp256k1::{PublicKey, SecretKey};
use sha2::{Sha256, Digest};
use double_sha256::{DoubleHash256};

use crate::utils;

pub fn test_shnorr() {
    let message = hex::decode("db2c34f90bab877f9aa6b186dbfa145efcaefefd44b5c3bf336c25f4caa83b2b");
    let sk = secp256k1::SecretKey::from_str("dc0bc448ac583857e77076e5fbf53d48fc1e4ad7e606a8dc25ee85fff1a0005f").unwrap();
    // let signature = rust_schnorr::sign_message(&sk, &message);
    let signature = rust_schnorr::sign_message(&sk, "hi there!");

    println!("\nSignature: {:?}", signature);
    println!("\nSignature: {:x?}", signature);
}

pub fn test_sha256() {
    // NOTE: This comes from the Core node.
    let str_header_commitment = "0321c7f915cafe44c764b19bfea4abce0863ebdac8d369b0715223818258834a";
    println!("\nHeader Commitment (str)\n{} ", str_header_commitment);

    /* Set header commitment. */
    let header_commitment: Vec<u8> = hex::decode(str_header_commitment)
        .expect("Oops! Invalid hex string.");
    println!("\nHeader Commitment (bytes): {:?}", header_commitment);

    let reverse_commitment = utils::reverse_bytes(&header_commitment);
    println!("\nReversed Header Commitment (bytes): {:?}", reverse_commitment);
    println!("{:?}\n", hex::encode(&reverse_commitment));

    let hasher_one = Sha256::new_with_prefix(&reverse_commitment);
    let hash_one = hasher_one.finalize();
    let hasher_two = Sha256::new_with_prefix(hash_one);
    let hash_two = hasher_two.finalize();
    println!("Hash One:    {:x}", hash_one);
    println!("Hash Two:    {:x}", hash_two);
    println!("Final Hash:  {:?}", hash_two);

    let double_hasher = DoubleHash256::new_with_prefix(&reverse_commitment);
    let double_hash = double_hasher.finalize();
    println!("Double Hash: {:x}", double_hash);

    assert_eq!(double_hash, hash_two);
    println!("\nHashes match! 👍\n")
}
