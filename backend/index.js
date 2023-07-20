const express = require("express")
const cors = require('cors');
const app = express()

require('dotenv').config

const postsRouter  = require('./routes/posts.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3001', 
  }));
app.use("/api/", postsRouter)

  

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Serveur running...")
})