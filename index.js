const express = require("express");
const cors = require("cors");
const db = require("./db/index.js");
const app = express();
const axios = require('axios')

const userSchema = require("./model/index");

app.use(cors());

app.use(express.json());

db(); // => Db Connection goes here

app.get("/user", async function (req, res) {
 try {
  const data = await userSchema.find();
  res.status(200).send(data);
 } catch (error) {
  console.log(error);
  res.status(500).send({ message: "Internal Server Error" });
 }
});

app.get("/db-user", async function (req, res) {
  try {
   const data = await userSchema.find();
   res.status(200).send(data);
  } catch (error) {
   console.log(error);
   res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/user", async (req, res) => {
    try {
        const {name, dob, description} = req.body;
        const [year, month, day] = dob.split('-');
        const todayDate = new Date();
        const age = Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000));
        const response = await axios.post('http://localhost:5000/db-user', {name, dob, age, description});
        res.status(200).send(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.post("/db-user", async (req, res) => {
  try {
    const {name, dob, age, description } = req.body;
    const newuser = new userSchema({name, dob, age, description});
    await newuser.save();
    res.status(200).json({ message: "Data Saved Successfully", data: newuser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log("You're listening to port", port);
});
