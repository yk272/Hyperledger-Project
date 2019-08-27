/*
module to deal with writing data to state , address generation ,hashing etc
*/


const crypto = require('crypto');
const {TextEncoder} = require('text-encoding/lib/encoding')
const {Secp256k1PrivateKey} = require('sawtooth-sdk/signing/secp256k1')
const {createContext,CryptoFactory} = require('sawtooth-sdk/signing');

var encoder = new TextEncoder('utf8')


// function to hash data
function hash(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
}

/* function to write data to state 
parameter : 
    context -  validator context object
    address - address to which data should be written to
    data - the data tto be written
*/
function writeToStore(context, address, data){
        dataBytes = encoder.encode(data)
        let entries = {
        [address]: dataBytes
      }
    return context.setState(entries);
    
}

/* function to retrive the address of a particular product  based on its crate id,product type,weight */

function getProductAddress(crateid,Product,weight){
    let nameHash = hash("ff")
    let sHash = hash(crateid)
    let pHash = hash(Product)
    let wHash = hash(weight)
    return nameHash.slice(0,6) +pHash.slice(0,6)+wHash.slice(0,4)+sHash.slice(0,54)

}

module.exports = {
hash,
writeToStore,
getProductAddress
}