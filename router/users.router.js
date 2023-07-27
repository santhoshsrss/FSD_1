import express from "express";
import { createUsers, getUserByName } from "../service/users.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

//! why hashing -> all password have unique value and highly secure
async function generateHashedPassword(password){
  const numberOfRounds = 10;
  const salt = await bcrypt.genSalt(numberOfRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}



//! Post Method
router.post("/signup", async function (request, response) {
  const {username, password} = request.body;
  const userFromDB = await getUserByName(username);
  console.log(userFromDB)
  if(userFromDB){
    response.status(401).send({ message: " Username already exit..."})
  }
  else if(password.length < 8)
  {
    response.status(401).send({ message: " Password is too small ???"})
  }
  
  else
  {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUsers({
      username: username,
      password: hashedPassword,
    })
    response.send(result);
  }


});

//! Login User
router.post("/login", async function (request, response) {
  const {username, password} = request.body;
  const userNameFromDB = await getUserByName(username);
  console.log(userNameFromDB)

  if(!userNameFromDB){
    response.status(400).send({ message: "Invalid Credentials"})
  }else{
    const storedDBPassword = userNameFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);
    if(isPasswordCheck){
      const token = jwt.sign({id: userNameFromDB._id}, process.env.SECRET_KEY);
      response.send({ message: "Successfully Logged In", token: token });
    }else{
      response.status(400).send({ message: "Invalid Credentials"})
    }
  }
});

export default router;
