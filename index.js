import express from "express";
import request from "request";
import bodyParser from "body-parser";
import rp from "request-promise";
import https from "https";
import moment from "moment";
import Chance from "chance";
import {updateDocument, findDocument, findAllDocuments, insertDocument} from './mongoMethods';
var chance = new Chance();


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
  res.send("hello world");
});

// Facebook Webhook
// Used for verification
app.get("/webhook", function (req, res) {
  if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
    console.log("Verified webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Verification failed. The tokens do not match.");
    res.sendStatus(403);
  }
});

// All callbacks for Messenger will be POST-ed here
app.post("/webhook", function (req, res) {
  // Make sure this is a page subscription
  if (req.body.object == "page") {
    // Iterate over each entry
    // There may be multiple entries if batched
    req.body.entry.forEach(function(entry) {
      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.postback) {
          processPostback(event);
        } 
        else if (event.message) {
          processMessage(event);
        }
      });
    });

    res.sendStatus(200);
  }
});

function processPostback(event) {
  let senderId = event.sender.id;
  let payload = event.postback.payload;

  if (payload === "Greeting") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name,timezone"
      },
      method: "GET"
    }, function(error, response, body) {
      let greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        let bodyObj = JSON.parse(body);
        let name = bodyObj.first_name;
        let timezone = bodyObj.timezone;
        insertDocument({userId: senderId, currentState: 0, timezone: timezone});
        sendMessage(senderId, [{text: "Hello " + name + ", please enter your verification ID."}]);
      }
    });
  }
}

function processMessage(event) {
  if (!event.message.is_echo) {
    var message = event.message;
    var senderId = event.sender.id;

    // handle normal messages and question sending here
    // question prompts for a state are always sent from previous state's bracket
    if (message.text) {
      findDocument(senderId).then(doc => {
        let currentUser = doc;
        let question;
        switch (currentUser.currentState) {
          case 0:
            let uniqueId = message.text;
            
            if (uniqueId == "mommy1") {
              // case where mother is accessing
              currentUser.currentState = 1;
              sendMessage(senderId, [{text: "How many kids do you need help with? (At most 3 children)"}]);
            }
            else if (uniqueId == "babysitter1") {
              // case where babysitter is accessing
              currentUser.currentState = 1;
            }
            else {
              sendMessage(senderId, "Invalid ID, please enter your ID again.")
            }

          case 1:
            if (parseInt(message.text) > 3 || isNaN(message.text)) {
              sendMessage(senderId, [{text: "Please enter a valid number."}]);
            }
            else {
              currentUser.numOfChildren = parseInt(message.text);
              currentUser.currentState = 2;
              updateDocument(currentUser, currentUser._id);
              sendMessage(senderId, [{text: "Please enter the period that you need help? (Please enter in the 24-hour format, HHMM. E.g. 0800-1900)"}]);
            }
            break;

          case 2:
            if (message.text.length != 9 || isNaN(message.text)) {
              sendMessage(senderId, [{text: "Please enter a valid format. E.g. 0800-1900"}]);
            }
            else {
              currentUser.startTime = message.text.substring(0,4);
              currentUser.endTime = message.text.substring(5,9);
              currentUser.currentState = 3;
              updateDocument(currentUser, currentUser._id);
              sendMessage(senderId, [{
                text: "Please enter the preferred pick-up location for your kids",
                quick_replies: [
                  {
                    content_type: "location",
                  }
                ]
              }]);
            }
            break;

          case 3:
            sendMessage(senderId, [{text: "Thank you"}]);
            break;
        }  
      });
    }
    else if (message.attachments) {
        sendMessage(senderId, [{text: "Sorry, I don't understand your request."}]);
    }  
  }
}
// sends messages to user
var sendMessage = (recipientId, messages, index=0) => {
  if (index < messages.length) {
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
      method: "POST",
      json: {
        recipient: {id: recipientId},
        message: messages[index]
      }
    }, (error, response, body) => {
      if (error) {
        console.log("Error sending message: " + response.error);
      }
      sendMessage(recipientId,messages,index+1);
    });
  }
  else {
    return;
  }  
}