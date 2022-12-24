exports.helloWorld = async (request, response) => {


const request = require('request');


if("text" in request.body.message && request.body.message.text == "/start"){
     const url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+request.body.message.chat.id+"&text=Send the image/video you want minted and add a caption in the following format. \n\nethAddress : title : description \n\nENS domains are valid.";
     request.get(url);
}

else if ("photo" in request.body.message){
     if ("caption" in request.body.message){
          var caption = request.body.message.caption;
          var photo = request.body.message.photo;
          var file_id = photo[photo.length - 1].file_id;
          var match = caption.match(/\b((?!=|\:|\:).)+(.)\b/g);
          if(match.length != 3){
               const url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+request.body.message.chat.id+"&text=Invalid caption format";
               request.get(url);
          }
          else{
               var address = match[0];
               var title = match[1];
               var description = match[2];
               const url = "<metadata api url>?chat_id="+request.body.message.chat.id+"&file_id="+file_id+"&address="+address+"&title="+title+"&description="+description+"";
               request.get(url);
          }
     }
     else
     {
     const url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+request.body.message.chat.id+"&text=Caption missing";
     request.get(url);
     }
}

else if ("video" in request.body.message){
      const url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+request.body.message.chat.id+"&text=Minting of videos is not supported at the moment.";
      request.get(url);
}

else {
     const url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+request.body.message.chat.id+"&text=Missing media. Send the image/video you want minted and add a caption in the following format. \n\nethAddress : title : description \n\nENS domains are valid.";
     request.get(url);
}

console.log(request.body.message);
response.send();


};
