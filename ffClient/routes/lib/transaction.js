/*
module to deal with address generation and hashing 
*/

const crypto = require("crypto");
const { TextEncoder } = require("text-encoding/lib/encoding");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const { createContext, CryptoFactory } = require("sawtooth-sdk/signing");

var encoder = new TextEncoder("utf8");

// function to hash data
function hash(data) {
  return crypto
    .createHash("sha512")
    .update(data)
    .digest("hex");
}

/* function to retrive the address of a particular product  based on its crate id,product type,weight */

function getProductAddress(crateid, Product, weight) {
  let nameHash = hash("ff");
  let sHash = hash(crateid);
  let pHash = hash(Product);
  let wHash = hash(weight);
  return (
    nameHash.slice(0, 6) +
    pHash.slice(0, 6) +
    wHash.slice(0, 4) +
    sHash.slice(0, 54)
  );
}

function getAllProducts() {
  let nameHash = hash("ff");
  return nameHash.slice(0, 6);
}

module.exports = {
  hash,
  getProductAddress,
  getAllProducts
};
