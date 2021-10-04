const express = require("express");
const app = express();
const port = 3001;

// MONGO DB
require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_CONNECTION);

async function main(lead) {
  try {
    await client.connect();
    await addLead(client, lead);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function addLead(client, obj) {
  await client.db("ukol").collection("leads").insertOne(obj);
}

app.use(express.json());

app.post("/lead", (req, res) => {
  main(req.body).catch(console.error);
  res.end();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
