use std::str::FromStr;
use std::str::from_utf8;
// use std::iter;
// use secp256k1::{PublicKey, SecretKey};
use sha2::{Sha256, Digest};
use double_sha256::{DoubleHash256};

use crate::utils;

pub fn test_shnorr() {
    // let sample1 = "hi there!";
    // println!("sample1 -> {:?}", sample1);

    // let sample_bytes = sample1.as_bytes();
    // println!("sample2 -> {:?}", sample_bytes);

    // let sample_str = from_utf8(sample_bytes);
    // println!("sample3 -> {:?}", sample_str);

    // let sparkle_heart = vec![240, 159, 146, 150];
    // let sparkle_heart = [240, 159, 146, 150];
    // let sparkle_heart = from_utf8(&sparkle_heart).unwrap();
    // assert_eq!("💖", sparkle_heart);

    // let random_str = from_utf8(&[240, 159, 146, 150]).unwrap();
    // println!("sample4 -> {:?}", random_str);

    // let test_str = from_utf8(&[240, 159, 146, 150]).unwrap();
    // println!("Sample data test -> {:?}", test_str);

    // let message = hex::decode("efc20ab75cfe99e142da638d25010f4c9ff3e5f0429e0ac6990ff812fdb82a99");
    // println!("message -> {:?}", message);
    // let safe_message = message.unwrap();
    // println!("safe_message -> {:?}", safe_message);
    // println!("safer_message -> {:?}", safer_message);

    let mut bytes = [0u8; 32];
    assert_eq!(hex::decode_to_slice("3eb969ee2fe3f7e1cfd40341c5d2b07a5880e9f63cdb9b514041429561bc533a", &mut bytes as &mut [u8]), Ok(()));
    // assert_eq!(hex::decode_to_slice("3a53bc6195424140519bdb3cf6e980587ab0d2c54103d4cfe1f7e32fee69b93e", &mut bytes as &mut [u8]), Ok(()));
    println!("\nBytes: {:?}", &bytes);
    println!("\nBytes: {:x?}", &bytes);

    // let bytes_str1 = from_utf8(&bytes);
    // println!("\nbytes_str1: {:?}", bytes_str1);
    // println!("\nbytes_str1: {:x?}", bytes_str1);
    // let bytes_str2 = from_utf8(&bytes).unwrap();
    // println!("\nbytes_str2: {:?}", bytes_str2);
    // println!("\nbytes_str2: {:x?}", bytes_str2);

    let sk = secp256k1::SecretKey::from_str("60da4e8c2952abff74b01c054cea219b5d0d7b977c48eaf240d89367cf591078").unwrap();
    // let sk = secp256k1::SecretKey::from_str("781059cf6793d840f2ea487c977b0d5d9b21ea4c051cb074ffab52298c4eda60").unwrap();
    // let signature = rust_schnorr::sign_message(&sk, safer_message.unwrap());
    let signature = rust_schnorr::sign_message(&sk, &bytes);
    // let signature = rust_schnorr::sign_message(&sk, "hi there!");

    println!("\nSignature: {:?}", signature);
    println!("\nSignature: {:x?}", signature);
    let formatted = hex::encode(&signature);
    println!("\nSignature: {:?}", formatted);

    let hasher_one = Sha256::new_with_prefix(&signature);
    let hash_one = hasher_one.finalize();
    println!("Hash One:    {:x}", hash_one);
}

pub fn test_sha256() {
    // NOTE: This comes from the Core node.
    let str_header_commitment = "efc20ab75cfe99e142da638d25010f4c9ff3e5f0429e0ac6990ff812fdb82a99";
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
    let hasher_tre = Sha256::new_with_prefix(hash_two);
    let hash_tre = hasher_tre.finalize();
    println!("Hash One:    {:x}", hash_one);
    println!("Hash Two:    {:x}", hash_two);
    println!("Hash Tre:    {:x}", hash_tre);
    println!("Final Hash:  {:?}", hash_two);

    let double_hasher = DoubleHash256::new_with_prefix(&reverse_commitment);
    let double_hash = double_hasher.finalize();
    println!("Double Hash   : {:x}", double_hash);

    let mut new_bytes: Vec<u8> = Vec::new();
    for i in 0..double_hash.len() {
        // println!("dVal: {}", double_hash[i]);
        new_bytes.push(double_hash[i]);
    }
    println!("new bytes: {:?}", new_bytes);

    let reverse_hash: Vec<u8> = utils::reverse_bytes(&new_bytes);
    println!("Reversed Hash      : {:?}", reverse_hash);
    let encoded = hex::encode(&reverse_hash);
    println!("Reversed Formatted : {:?}", encoded);

    assert_eq!(double_hash, hash_two);
    println!("\nHashes match! 👍\n")
}
