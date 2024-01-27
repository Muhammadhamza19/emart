const User = require('./usermodel')
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const { Error } = require('sequelize');


const signup = async(req,res)=>{
    try {
      console.log("jellll");
        const { username,  email, password } = req.body;
console.log( req.body);

        const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword , "hashedPassword");
    const newUser = await User.create({
        username,
      email,
      password: hashedPassword,
    });

    console.log('New user:', newUser);

    const token = jwt.sign(
      { email: newUser.email, _id: newUser._id },
      "123456",
      { expiresIn: "24h" }
    );

    console.log("helllllo");
    return res.status(200).json({
      response: 200,
      message: "Sign-up Successful",
      status: true,
      data: { user: newUser, token },
    });
    } catch (error) {
       return error 
    }

}

const login = async(req,res)=>{

  try {
    
  
  const {email , password} = req.body

const userdetail = await User.findOne({
  where :{
    email : email
  }
})
if(!userdetail){
  throw new Error("user not found")
}

 const passwordmatch = await bcrypt.compare(password , userdetail.password)

 if(!password){
  throw new Error("incorrect password , please enter correct password")
 }



 const token = await jwt.sign({
  email : userdetail.email , _id: userdetail._id 
 } , "123456" , {
  expiresIn : '24h'
 })
 return res.status(200).json({
            response: 200,
            message: "Login Successful",
            status: true,
            data: { userdetail, token },
        });
} catch (error) {
    return res.send("error" , error)
  }

}

module.exports = {signup ,login}