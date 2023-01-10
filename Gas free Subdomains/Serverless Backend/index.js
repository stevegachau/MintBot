const MongoClient = require('mongodb').MongoClient;
const uri = "..."; //database uri
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
const clientPromise = client.connect();

exports.ens = async (req, res) => {

const { TwitterApi } = require('twitter-api-v2');

const twitterclient = new TwitterApi({ 
  appKey: '...',  //TWITTER API KEYS
  appSecret: '...',
  accessToken: '...',
  accessSecret: '...',
});
        
var text = req.body;
var string = text.toLowerCase();
var match = string.match(/(?=:.*?(\w+))/s);
var address = match[1];
var matchid = string.match(/^([\w\-]+)/);
var reply = matchid[0];

function validateAddresses(address) {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
}

if (validateAddresses(address) == false) {res.status(200).send({"error":"Invalid Address"})}

else {
var string2 = string.replace(':',' :');
var match2 = string2.match(/\w+(?=\s+:)/s);
var name = match2[0];
var ens = name+".-id.eth";
console.log(address);
console.log(ens);
console.log(reply);


client = await clientPromise;
const collection = client.db("names").collection("subs");
const find = await collection.countDocuments({ens:ens});

if(find > 0) {
  twitterclient.v2.like('2371899991', reply);
  res.status(200).send({"error":"That subdomain has already been registered"})
}

else{
const result = await collection.insertMany([{ens:ens,address:address}]);

twitterclient.v2.reply("https://rainbow.me/"+ens, reply);

res.send();
}}};
