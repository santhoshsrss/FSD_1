import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js";
import usersRouter from "./router/users.router.js";
import cors from "cors";

//! CORS = Cross-Origin Resource Sharing. 

const app = express();
const PORT = process.env.PORT;


//! env = environmental variables.
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL);
//! it is a top level await so we don't need to use async:
await client.connect();
console.log("Mongodb is started Running in the System");

//! Using CORS -> is a third party middleware
app.use(cors())

//! express.json() - inbuilt middleware
//! This middleware will convert the body into json
app.use(express.json())

//! welcome message
app.get("/", function (request, response) {
  response.send("🙋‍♂️, Hi Welcome!!! ");
});

app.use("/movies", moviesRouter)
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

