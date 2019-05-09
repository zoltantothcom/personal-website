const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'yourgmailaccount@gmail.com',
      pass: 'yourgmailaccpassword'
  }
});

exports.send = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
      // getting dest email by query string
      const dest = 'zoltantoth.com@gmail.com';

      const mailOptions = {
          from: 'Your Account Name <yourgmailaccount@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'I\'M A PICKLE!!!', // email subject
          html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
              <br />
              <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
          ` // email content in HTML
      };

      // returning result
      return transporter.sendMail(mailOptions, (error, info) => {
          if(error){
              return res.send(error.toString());
          }
          return res.send('Sent');
      });
  });    
});

// exports.send = functions.https.onRequest((req, res) => {
//   console.log(req);
//   console.log(req.username);

//   res.status(200).send({"success": true})
// });