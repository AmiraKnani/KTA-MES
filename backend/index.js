require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const express = require("express");
const cors = require('cors');
const app = express();


const postsRouter = require('./routes/posts.router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
}));

let verificationCodes = {}; 

app.post('/api/coderequest', (req, res) => {
  const { email } = req.body;
  let code = Math.floor(100000 + Math.random() * 900000);
  verificationCodes[email] = code; 

  res.json({ success: true, code: code });
});

app.post('/api/verifycode', (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === Number(code)) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

app.post('/send-email', (req, res) => {
  const { to, templateId, dynamicTemplateData } = req.body;

  const msg = {
    to,
    from: 'contact@logimes.com',
    templateId: "d-1c471dac89a14be1bc6414c49d51a788",
    dynamicTemplateData,
  };
  sgMail
    .send(msg)
    .then(() => res.json({ success: true }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    });
});

app.use("/api/", postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...");
});
