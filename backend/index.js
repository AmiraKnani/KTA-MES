const express = require("express");
const cors = require('cors');
const app = express();

require('dotenv').config();

const postsRouter = require('./routes/posts.router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',
}));

let verificationCodes = {}; // This could be a database in a real application

app.post('/api/coderequest', (req, res) => {
  const { email } = req.body;

  let code = Math.floor(100000 + Math.random() * 900000);
  verificationCodes[email] = code; // Store the code

  // Send the code to the email address...

  res.json({ success: true });
});

app.post('/api/verifycode', (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === Number(code)) {
    res.json({ verified: true });
  } else {
    res.json({ verified: false });
  }
});

app.use("/api/", postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...");
});
