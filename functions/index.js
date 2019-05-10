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
          from: `${escape(req.name, true)} <${escape(req.name, true)}>`,
          to: 'zoltantoth.com@gmail.com',
          subject: 'PORTFOLIO - Contact Form Submission',
          html: escape(req.message, true)
      };

      return transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.send(error.toString());
          }

          if (req.phone) {
            return res.send('Eat shit retarded spam bot.')
          }

          return res.send('Thank you! Your message has been successfully sent.');
      });
  });    
});
