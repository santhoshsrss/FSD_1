import express from "express";
import { client } from "../index.js";
const router = express.Router();

//! connect get method to mongodb server
router.get("/", async function (request, response) {
  //* curser => means pagination || curser can be converted in array by using toArray()
  const movies = await client.db("b42wd2").collection("movies").find({}).toArray();
  response.send(movies);
});

//! connect using ID and get the specific data in mongodb. 
router.get("/:id", async function (request, response) {
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
router.delete("/:id", async function (request, response) {
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
router.post("/", async function (request, response) {
  const data = request.body;
 
  const result = await client
    .db("b42wd2")
    .collection("movies")
    .insertMany(data);
  response.send(result);
});

//! connect using ID and UPDATE the specific data in mongodb. 
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body
  
  //* db.movies.updateOne(id:id, ${set: date})

  const result = await client
    .db("b42wd2")
    .collection("movies")
    .updateOne({id: id}, {$set: data});

   response.send(result)
});

export default router;