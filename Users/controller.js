const User = require('./usermodel')
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const { Error } = require('sequelize');


const signup = async (req, res) => {
  try {
    const { username, email, password, UserType, imageURL } = req.body;

    console.log("jellll");
    if (UserType == 1) {
      Role = 'admin'
    }
    if (UserType == 2) {
      Role = 'user'
    }
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      imageURL,
      UserType,
      Role
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
    return res.status(400).json({
      response: 400,
      message: "Sign-up Failed",
      status: false,
      error: error.message,
    });
  }

}

const login = async (req, res) => {

  try {


    const { email, password } = req.body

    const userdetail = await User.findOne({
      where: {
        email: email
      }
    })
    if (!userdetail) {
      throw new Error("user not found")
    }

    const passwordmatch = await bcrypt.compare(password, userdetail.password)

    if (!password) {
      throw new Error("incorrect password , please enter correct password")
    }



    const token = await jwt.sign({
      email: userdetail.email, _id: userdetail._id
    }, "123456", {
      expiresIn: '24h'
    })
    return res.status(200).json({
      response: 200,
      message: "Login Successful",
      status: true,
      data: { userdetail, token },
    });
  } catch (error) {
    return res.status(400).json({
      response: 400,
      message: "Sign-in Failed",
      status: false,
      error: error.message,
    });  }

}




const getUserByID = async(req,res)=>{
  try {
    console.log("heppu");
    const id = req.params.id

    const UserDetails = await User.findByPk(id)
    return res.status(200).json({
      response: 200,
      message: "User Details",
      status: true,
      data: UserDetails,
    });  } catch (error) {
      return res.status(400).json({
        response: 400,
        message: "something went wrong",
        status: false,
        error: error.message,
      });
    
  }
}

module.exports = { signup, login  , getUserByID}