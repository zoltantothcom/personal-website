const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: gmailEmail,
      pass: gmailPassword
  }
});

const ESC_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

function escape(s, forAttribute) {
  return s.replace(forAttribute ? /[&<>'"]/g : /[&<>]/g, (c) => ESC_MAP[c]);
}

exports.send = functions.https.onRequest((req, res) => {  
  cors(req, res, () => {
      const mailOptions = {
          from: {
            name: 'PORTFOLIO - Contact Form',
            address: escape(req.body.email, true)
          },
          replyTo: escape(req.body.email, true),
          to: 'zoltantoth.com@gmail.com',
          subject: `Message from ${escape(req.body.name, true)}`,
          html: `<p>${escape(req.body.message, true)}</p>`
      };

      return transporter.sendMail(mailOptions, (error) => {
          if (error) {
            return res.send(error.toString());
          }

          if (req.body.phone) {
            return res.send({'message': 'Eat shit retarded spam bot.'})
          }

          return res.send({'message': 'Thank you! Your message has been successfully sent.'});
      });
  });    
});
