const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { response, request } = require("express");
admin.initializeApp(functions.config().firebase);
var db = admin.database();

exports.register = functions.https.onRequest(async (request, response) => {
  response.send("Hello From Cloud Function");
});
