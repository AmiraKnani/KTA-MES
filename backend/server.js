const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const filePath = './Taux-productivite-poste.csv'; 
const { MongoClient } = require('mongodb');
const { receiveMessageOnPort } = require('worker_threads');
const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let results = [];
let totalProductivityRate = 0;
logins=[]


//function to test the email reset code 
async function testcode(data) {
  try {
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const codes = database.collection("codes");
    // query for the correct login
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    const query = { email: data.email, code:Number(data.code), date: { $gt: tenMinutesAgo } };
    let status
    // print a message if no documents were found
    if ((await codes.countDocuments(query)) === 0) {
      status = false;
    }else{
      status = true;
    }
    return status;
  } finally {
    await client.close();
  }
}
// function to test if the email exists in the users database
async function testmail(mail) {
  try {
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const users = database.collection("logidas");
    // query for the correct login

    const query = { email: mail };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { email: 1 },
      // Include only login and password fields in each returned document 
      projection: { _id: 0, email: 1, password: 1, user:1 }
    };
    const cursor = users.find(query);
    let status
    // print a message if no documents were found
    if ((await users.countDocuments(query)) === 0) {
      status = false;
    }else{
      status = true;
    }
    return status;
  } finally {
    await client.close();
  }
}
//function to test if the login is correct 
async function testlogin(data) {
  try {
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const users = database.collection("logidas");
    // query for the correct login
    const query = { email: data.email,password : data.password };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { email: 1 },
      // Include only login and password fields in each returned document 
      projection: { _id: 0, email: 1, password: 1,user:1 }
    };
    const cursor = users.find(query);
    let status
    // print a message if no documents were found
    if ((await users.countDocuments(query)) === 0) {
      status = false;
    }else{
      status = true;
    }
    return status;
  } finally {
    await client.close();
  }
}
//read data from file and send it to api
fs.createReadStream(filePath)
  .pipe(csv({}))
  .on('data', (data) => results.push(data))
  .on('end', async () => {
          console.log(results)

    for(let i=0;i<Object.keys(results).length;i++){
      totalProductivityRate=totalProductivityRate+Number(results[i].tauxProductivite)
    }
    const moy=totalProductivityRate/Object.keys(results).length
    app.get('/data', (req, res) => {
      res.json({ data: results, moy, numPostes: Object.keys(results).length });
    });
    app.listen(5000, () => {
      console.log('server started on port 5000');
    });
  });

app.use(express.json()); 


  //generate the code
  app.post('/api/coderequest', async (req, res) => {
    // Access the received data from the request body
    const receivedData = req.body;
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const codes = database.collection("codes");
    const datenow = new Date();
    datenow.setMinutes(datenow.getMinutes());
    const document = { email: receivedData.email, code: receivedData.code, date : datenow };
    const exists= await testmail(receivedData.email);
    if (exists){
      codes.insertOne(document,function(err, result) {});
       codes.close
     } 
    // Send the result back to the frontend
    res.json({ exists: exists });
  });
  //handle login
  app.post('/api/login', async (req, res) => {
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const users = database.collection("logidas");
    // Access the received data from the request body
    const receivedData = req.body;
    let result={login:false,email:"",username:""}
    const exists= await testmail(receivedData.email);
    if (exists){
    const logins= await testlogin(receivedData);
    if (logins){
     await users.findOne({ email: receivedData.email })
        .then(resulta => {
          result.username=resulta.user
          result.email=resulta.email
          result.pic=resulta.pic
        })
        .catch(err => {
          console.error(err);
        });
      result.login=true;
    }else{
      result.err= "Invalid password"
    }
    }else{
      result.err="invalid email"
    }
    res.json({ result: result });
  });
  // confirm the code svubmitted
  app.post('/api/codeconf', async (req, res) => {
    // Access the received data from the request body
    const receivedData = req.body;
    const code= await testcode(receivedData);
    res.json({ success:code, email:receivedData.email, code:receivedData.code});
  });
  // change the password
  app.post('/api/resetpw', async (req, res) => {
    // Access the received data from the request body
    const uri = "mongodb+srv://omarbane1:20039565ae@logidas.jikyhcu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    const database = client.db("Logidas");
    const users = database.collection("logidas");
    let err=""
    const receivedData = req.body;
    let success=false
    if (receivedData.pass1===receivedData.pass2){
      if ((receivedData.pass1.length>=8)){
      const newData={email : receivedData.email,password : receivedData.pass1}
      const result=await users.updateOne({ email: receivedData.email }, { $set: newData });
      if (result){
        success=true
      }else{
        err="Unexpected error when modifying database"
      }
    }else{
      err="Password must be 8 caracters in length"

    }
  }else{
    err="Passwords don't match"

  }
    // Perform any necessary operations with the data
  
    // Send a response back to the client
    res.json({ success:success, error:err});
  });
  //stock user login status



  
  /* Connection to MongoDB

async function fetchFromDatabase() {
  try {
    await client.connect();
    const database = client.db("Logidas");
    const collection = database.collection("datas");  // Connect to the 'datas' collection.

    const data = await collection.find({}).toArray();
    return data;
  } finally {
    await client.close();
  }
}

// Fetch data from database and start the server
fetchFromDatabase()
.then(data => {
  const distinctPostes = [...new Set(data.map(doc => doc.Poste))];
  console.log(distinctPostes);

    app.get('/data', (req, res) => {
      let totalProductivityRate = 0;
      const results = [...new Set(data.map(doc => doc.Poste))];
      for (let i = 0; i < results.length; i++) {
        totalProductivityRate += Number(results[i].TauxRendementSynthetique);
      }
      const moy = totalProductivityRate / results.length;

      res.json({ data: results, moy, numPostes: results.length });
    });

    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch(err => {
    console.error('Error fetching data from MongoDB:', err);
  }); */
