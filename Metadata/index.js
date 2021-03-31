
exports.helloWorld = async (req, res) => {

  const request = require('request');
  const { default: Resolution } = require('@unstoppabledomains/resolution');
  const resolution = new Resolution();
  const fleekStorage = require('@fleekhq/fleek-storage-js');
  const fs = require('fs'); 
  const fetch = require('node-fetch');

  var chat_id = req.query.chat_id;
  var addy = req.query.address;
  var title = req.query.title;
  var description = req.query.description;
  var file_id = req.query.file_id;
  var user;
  var image;

  var lowercase = addy.toLowerCase();
  var address1 = lowercase.match(/0x[a-fA-F0-9]{40}/);
  var address2 = lowercase.match(/(?:[\w-]+\.)+(?:crypto|eth|xyz|luxe|kred)/);


  async function fleek(){
  var url = "https://api.telegram.org/bot<token>/getFile?file_id="+file_id+"";
  request.get(url, async (error, resp, body)  => {
  let json = JSON.parse(body);
  console.log(json);
  var filepath = "https://api.telegram.org/file/bot<token>/"+json.result.file_path+"";

  const response = await fetch(filepath);
  const buffer = await response.buffer();

  fs.writeFile('/tmp/data', buffer, () => 
    console.log(filepath));

    fs.readFile('/tmp/data', async (error, fileData) => {
    const uploadedFile = await fleekStorage.upload({
    apiKey: ' ',
    apiSecret: ' ',
    key: ''+file_id+'',
    data: fileData,});
   
    image = "ipfs://"+uploadedFile.hash+"";
    console.log(image);
    var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Media Uploaded to IPFS";
    request.get(url);
    var url = "<minting api url>?user="+user+"&image="+image+"&name="+title+"&description="+description+"&chat_id="+chat_id+"";
    request.get(url);
    
  });
  });
  }

  async function resolve(domain, currency) {
  resolution
    .addr(domain, currency)
    .then((address) => {
    user = address;
    var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Minting NFT to "+user+"";
    request.get(url);
    fleek();
    })
    .catch((error) => {
    var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Your ENS address could not be resolved. Try another address";
    request.get(url);
    });
    }


  

  if (!address1 && !address2){
       var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Missing ETH address. Try again";
       request.get(url);
  }
  else if (address1){
    
    user = address1;
    var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Minting NFT to "+user+"";
    request.get(url);
    fleek();}

  else{
       resolve(''+address2[0]+'', 'ETH');
  }
  

console.log(req.query);

  res.status(200).send();
};
