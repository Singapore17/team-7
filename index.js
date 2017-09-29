import express from "express";
import request from "request";
import bodyParser from "body-parser";
import rp from "request-promise";
import https from "https";
import moment from "moment";
import Chance from "chance";
var chance = new Chance();


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
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