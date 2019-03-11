//links
//http://eloquentjavascript.net/09_regexp.html
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot', //name of the chatbot
  talking = true; //when false the speach function doesn't work

// var apigClient = apigClientFactory.newClient();
// var apigClient = apigClientFactory.newClient({
//   apiKey: 'Let0VLJ0iW5Fvi6ivuhW46vSR3jHdmbQ4Imny4W7'
// });
// var apigClientFactory = require('aws-api-gateway-client').default;


// var apigClient = apigClientFactory.newClient({
//   apiKey: '4ZoLlZY74F9LdEyraMhhvazDGiYYHRco2cy6Uo60'
// });

var apigClient;
var t1=location; 
var URL=t1.toString(); 
token = URL.split("id_token=")[1];
token = token.split("&access_token=")[0];
console.log(token);

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:15d7145f-e1eb-4561-a1cb-232eab8cdc02',
    Logins:{
      'cognito-idp.us-east-1.amazonaws.com/us-east-1_PVcCCa9S3':token
    }
});

AWS.config.credentials.get(function(error){
    if(!error){
    // Credentials will be available when this function is called.
    var accessKeyId = AWS.config.credentials.accessKeyId;
    var secretAccessKey = AWS.config.credentials.secretAccessKey;
    var sessionToken = AWS.config.credentials.sessionToken;
    console.log(accessKeyId)
    console.log(secretAccessKey)
    console.log(sessionToken)
    apigClient = apigClientFactory.newClient({
        apiKey: '4ZoLlZY74F9LdEyraMhhvazDGiYYHRco2cy6Uo60',
        region: "us-east-1",
        accessKey: accessKeyId,
        secretKey: secretAccessKey,
        sessionToken: sessionToken
      });
    console.log("apigc1")
    }
    else
    {
      apigClient = apigClientFactory.newClient({
      apiKey: '4ZoLlZY74F9LdEyraMhhvazDGiYYHRco2cy6Uo60'
});
      console.log("apigc2")
    }

    AWS.config.credentials.refresh((error) => {
                if (error) {
                    alert('not log in')
                    console.error(error);
                } else {
                    console.log('Success');
                }
            });
});

// 9uMiWuJU928VPLMG4mgCc5BrkXja5YSp1x8qnu0N


// apigClient.chatbotPost(params, body, additionalParams)
//     .then(function(result){

//       // Add success callback code here.
//     }).catch( function(result){
//       // Add error callback code here.
//     });

// var apigClient = apigClientFactory.newClient({
// apiKey: '9uMiWuJU928VPLMG4mgCc5BrkXja5YSp1x8qnu0N'//'ACCESS_KEY',
// // secretKey: AWS.config.credentials.secretAccessKey, //'SECRET_KEY',
// // sessionToken: AWS.config.credentials.sessionToken, // 'SESSION_TOKEN', //OPTIONAL: If you are using temporary credentials you must include the session token
// // region: 'us-east-2' // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
// });
//
//
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = "I'm confused"; //the default message

  if (lastUserMessage === 'hi' || lastUserMessage =='hello') {
    const hi = ['hi','howdy','hello']
    botMessage = hi[Math.floor(Math.random()*(hi.length))];;
  }

  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }
}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}



//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
// function Speech(say) {
//   if ('speechSynthesis' in window && talking) {
//     var utterance = new SpeechSynthesisUtterance(say);
//     //msg.voice = voices[10]; // Note: some voices don't support altering params
//     //msg.voiceURI = 'native';
//     //utterance.volume = 1; // 0 to 1
//     //utterance.rate = 0.1; // 0.1 to 10
//     //utterance.pitch = 1; //0 to 2
//     //utterance.text = 'Hello World';
//     //utterance.lang = 'en-US';
//     speechSynthesis.speak(utterance);
//   }
// }

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
     var send_txt=document.getElementById("chatbox");
     var input = $("#chatbox").val();
        if (send_txt.value == '') {
            alert("please input message");
        } else {

            chat_ul.innerHTML += '<li><span class="spanright">' + send_txt.value + '</span>';
           
        console.log(input);
    var params = {};
    var body = {
            
             "input": input
  // This is where you define the body of the request,
};
    var additionalParams = {};
apigClient.chatbotPost(params, body, additionalParams)
          .then(function(response){
            // Add success callback("#userMsg").val("");
          // var a = $("<div class='incoming_msg'><div class='incoming_msg_img'>< img src='img/icon.png'></div><div class='received_msg'><p>" + data["data"]["response"] + "</p ></div></div></div>");
          // $("#m_his").append(a);  
           console.log(response)
           chat_ul.innerHTML += '<li ><span class = "spanleft">' + response.data.body.substring(0,response.data.body.length)+ '</span>' + '</li>';
          // console.log(data["data"]["response"]);
           // $('#botResponse').val(data["data"]["response"]);
          }).catch( function(result){
            // Add error callback code here.
            console.log(result);
            });
    $("#chatbox").val("")
     }
   }
  }


//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}