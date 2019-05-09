const functions = require('firebase-functions');

exports.send = functions.https.onRequest((req, res) => {
  console.log(req);
  console.log(req.username);

  res.status(200).send({"success": true})
});