const MongoClient = require('mongodb').MongoClient;
const uri = "..."; //Database URI
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
const clientPromise = client.connect();


exports.helloWorld = async (req, res) => {

res.set('Access-Control-Allow-Origin', '*');

if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
} 
  
else {


var sender = req.query.sender;
var resolverdata = req.query.data;
const Web3 = require('web3');
const ethers = require('ethers');
const InputDataDecoder = require('ethereum-input-data-decoder');
var domainaddress;
var domaincontract;
var web3;
var mongoaddr;
web3 = new Web3('.....');  //Optimism RPC


//ABI to decode the ETH Calldata
const decoderabi = [{"inputs": [{"internalType": "string", "name": "_url","type": "string"},{"internalType": "address[]", "name": "_signers", "type": "address[]"}],"stateMutability": "nonpayable", "type": "constructor"},{"inputs": [{"internalType": "address", "name": "sender","type": "address"},{"internalType": "string[]", "name": "urls","type": "string[]"},{"internalType": "bytes", "name": "callData", "type": "bytes"},{"internalType": "bytes4", "name": "callbackFunction", "type": "bytes4"},{"internalType": "bytes", "name": "extraData", "type": "bytes"}],"name": "OffchainLookup", "type": "error"},{"anonymous": false, "inputs": [{"indexed": false,"internalType": "address[]", "name": "signers","type": "address[]"}],"name": "NewSigners", "type": "event"},{"inputs": [{"internalType": "address", "name": "target","type": "address"},{"internalType": "uint64", "name": "expires","type": "uint64"},{"internalType": "bytes", "name": "request","type": "bytes"},{"internalType": "bytes", "name": "result","type": "bytes"}],"name": "makeSignatureHash", "outputs": [{"internalType": "bytes32", "name": "","type": "bytes32"}],"stateMutability": "pure", "type": "function"},{"inputs": [{"internalType": "bytes", "name": "name","type": "bytes"},{"internalType": "bytes", "name": "data","type": "bytes"}],"name": "resolve","outputs": [{"internalType": "bytes", "name": "","type": "bytes"}],"stateMutability": "view", "type": "function"},{"inputs": [{"internalType": "bytes", "name": "response", "type": "bytes"},{"internalType": "bytes", "name": "extraData", "type": "bytes"}],"name": "resolveWithProof", "outputs": [{"internalType": "bytes", "name": "","type": "bytes"}],"stateMutability": "view", "type": "function"},{"inputs": [{"internalType": "address", "name": "","type": "address"}],"name": "signers","outputs": [{"internalType": "bool", "name": "","type": "bool"}],"stateMutability": "view", "type": "function"},{"inputs": [{"internalType": "bytes4", "name": "interfaceID", "type": "bytes4"}],"name": "supportsInterface", "outputs": [{"internalType": "bool", "name": "","type": "bool"}],"stateMutability": "pure", "type": "function"},{"inputs": [],"name": "url","outputs": [{"internalType": "string", "name": "","type": "string"}],"stateMutability": "view", "type": "function"}];
const decoder = new InputDataDecoder(decoderabi);


//ABI of the deployed offchainresolver contract
const Resolver_abi = [{"inputs":[{"internalType":"contract ENS","name":"_ens","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"contentType","type":"uint256"}],"name":"ABIChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"address","name":"a","type":"address"}],"name":"AddrChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"coinType","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"newAddress","type":"bytes"}],"name":"AddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"bool","name":"isAuthorised","type":"bool"}],"name":"AuthorisationChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"hash","type":"bytes"}],"name":"ContenthashChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"name","type":"bytes"},{"indexed":false,"internalType":"uint16","name":"resource","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"record","type":"bytes"}],"name":"DNSRecordChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"name","type":"bytes"},{"indexed":false,"internalType":"uint16","name":"resource","type":"uint16"}],"name":"DNSRecordDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"DNSZoneCleared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"bytes4","name":"interfaceID","type":"bytes4"},{"indexed":false,"internalType":"address","name":"implementer","type":"address"}],"name":"InterfaceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"x","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"y","type":"bytes32"}],"name":"PubkeyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"string","name":"indexedKey","type":"string"},{"indexed":false,"internalType":"string","name":"key","type":"string"}],"name":"TextChanged","type":"event"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"contentTypes","type":"uint256"}],"name":"ABI","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"addr","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"coinType","type":"uint256"}],"name":"addr","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"authorisations","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"clearDNSZone","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"contenthash","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint16","name":"resource","type":"uint16"}],"name":"dnsRecord","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"name","type":"bytes32"}],"name":"hasDNSRecords","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"interfaceImplementer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"pubkey","outputs":[{"internalType":"bytes32","name":"x","type":"bytes32"},{"internalType":"bytes32","name":"y","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"contentType","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"setABI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"coinType","type":"uint256"},{"internalType":"bytes","name":"a","type":"bytes"}],"name":"setAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"a","type":"address"}],"name":"setAddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bool","name":"isAuthorised","type":"bool"}],"name":"setAuthorisation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes","name":"hash","type":"bytes"}],"name":"setContenthash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"setDNSRecords","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes4","name":"interfaceID","type":"bytes4"},{"internalType":"address","name":"implementer","type":"address"}],"name":"setInterface","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"x","type":"bytes32"},{"internalType":"bytes32","name":"y","type":"bytes32"}],"name":"setPubkey","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"key","type":"string"},{"internalType":"string","name":"value","type":"string"}],"name":"setText","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"key","type":"string"}],"name":"text","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
const Resolver = new ethers.utils.Interface(Resolver_abi);


//ABI of the deployed Subdomain NFT on L2
const domainabi = [{"inputs": [{"internalType": "string","name": "baseURI","type": "string"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "operator","type": "address"},{"indexed": false,"internalType": "bool","name": "approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": true,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "string","name": "","type": "string"}],"name": "addrOf","outputs": [{"internalType": "uint256","name": "id","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "subDomainOwner","type": "address"},{"internalType": "string","name": "subDomain","type": "string"}],"name": "mintSubdomain","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "nameOf","outputs": [{"internalType": "string","name": "ensname","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "subDomain","type": "string"}],"name": "resolve","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "operator","type": "address"},{"internalType": "bool","name": "approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "baseURI","type": "string"}],"name": "setBaseTokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "string","name": "str","type": "string"}],"name": "testAlphaNumeric","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"}];



var dataresult = await decoder.decodeData(resolverdata);
var hexname = dataresult.inputs[0];
var data = dataresult.inputs[1];
var utf8 = await web3.utils.hexToUtf8(hexname);
var sliced = utf8.slice(1);
var domain = sliced.replace(/[\x00\x01\x02\x03\x04\x05]/g," ");
var fulldomain = domain.trim().split(/\s+/);

var sub = fulldomain[0];
var tld = fulldomain[1];
var ext = fulldomain[2];

var name = sub+"."+tld+"."+ext;
console.log(name);

const privateKey = "...."; //priv key
const signer = new ethers.utils.SigningKey(privateKey);

if (tld == "ecc"){ 
  
domainaddress = "0x9fb848300E736075eD568147259bF8a8eeFe4fEf"; 
web3 = new Web3('......'); //optimism rpc
const account = web3.eth.accounts.wallet.add(privateKey);
web3.eth.defaultAccount = account.address;
domaincontract = new web3.eth.Contract(domainabi, domainaddress, {
    from: '....' //from address
    })
}


if (tld == "-id"){ 

client = await clientPromise;
const collection = client.db("names").collection("subs");
const find = await collection.countDocuments({ens:name})
if(find == 0) {mongoaddr = "0x0000000000000000000000000000000000000000"}
else{
const records = await collection.findOne({ens:name});
mongoaddr = records.address;
}
}



async function handler(args) {

 if (args.length == 1){ 
   if (tld == "-id"){ var addr = mongoaddr;}
   else{
   var addr = await domaincontract.methods.resolve(sub).call();
   } 
   return { result: [addr] };
 }

 else if (args[1].toString() == 60 ) { 
   if (tld == "-id"){ var addr = mongoaddr;}
   else{
   var addr = await domaincontract.methods.resolve(sub).call();
   } 
   return { result: [addr] };
 }
 else if (args[1].toString() == 0 ) { var addr = "0x0000000000000000000000000000000000000000"; return { result: [addr] }; }
 else if (args[1].toString() == 2 ) { var addr = "0x0000000000000000000000000000000000000000"; return { result: [addr] }; }
 else if (args[1].toString() == 3 ) { var addr = "0x0000000000000000000000000000000000000000"; return { result: [addr] }; }
 else if (args[1] == "url") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "email") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "avatar") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "description") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "notice") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "keywords") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "com.discord") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "com.twitter") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "com.github") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "com.reddit") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "org.telegram") { var addr = ""; return { result: [addr] }; }
 else if (args[1] == "eth.ens.delegate") { var addr = ""; return { result: [addr] }; }
 else {
   console.log(args);
   res.status(200).send();}
};


async function query(name, data){

  const { signature, args } = Resolver.parseTransaction({ data });
  const { result } = await handler(args);

  return {
    result: Resolver.encodeFunctionResult(signature, result),
    validUntil: Math.floor(Date.now() / 1000 ),
  };

}


const { result, validUntil } = await query(name, data);

let messageHash = ethers.utils.solidityKeccak256(
          ['bytes', 'address', 'uint64', 'bytes32', 'bytes32'],
          [
            '0x1900',
            sender,
            validUntil,
            ethers.utils.keccak256(resolverdata || '0x'),
            ethers.utils.keccak256(result),
          ]
        );


const sig = signer.signDigest(messageHash);
const sigData = ethers.utils.hexConcat([sig.r, sig._vs]);
const returndata = web3.eth.abi.encodeParameters(['bytes','uint64','bytes'], [result, validUntil, sigData]);


res.status(200).send({"data":returndata});
}
}
