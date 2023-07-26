import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4000;


//! env = environmental variables.
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
//! it is a top level await so we don't need to use async:
await client.connect();
console.log("Mongodb is connect");

//! express.json() - inbuilt middleware
//! This middleware will convert the body into json
app.use(express.json())

//! welcome message
app.get("/", function (request, response) {
  response.send("🙋‍♂️, Hi Welcome!!! ");
});

//! connect get method to mongodb server
app.get("/movies", async function (request, response) {
  //* curser => means pagination || curser can be converted in array by using toArray()
  const movies = await client.db("b42wd2").collection("movies").find({}).toArray();
  response.send(movies);
});

//! connect using ID and get the specific data in mongodb. 
app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  //* Mongodb Connection

  const movie = await client
    .db("b42wd2")
    .collection("movies")
    .findOne({ id: id });

  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie Not Found" });
});

//! connect using ID and DELETE the specific data in mongodb. 
app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;
  //* Mongodb Connection

  const result = await client
    .db("b42wd2")
    .collection("movies")
    .deleteOne({ id: id });

  result.deletedCount >= 1
    ? response.send({message: "Movie Deleted Successfully"})
    : response.status(404).send({ message: "Movie Not Found" });
});

//! Post Method
app.post("/movies", async function (request, response) {
  const data = request.body;
 
  const result = await client
    .db("b42wd2")
    .collection("movies")
    .insertMany(data);
  response.send(result);
});

//! connect using ID and UPDATE the specific data in mongodb. 
app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body
  
  //* db.movies.updateOne(id:id, ${set: date})

  const result = await client
    .db("b42wd2")
    .collection("movies")
    .updateOne({id: id}, {$set: data});

   response.send(result)
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
