const User = require('./usermodel')
const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
// const { Error } = require('sequelize');





class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

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

    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      throw new HttpError("user not found", 401);

      // throw new HttpError("user not found")
    }

    const passwordmatch = await bcrypt.compare(password, user.password)

    if (!passwordmatch) {
      throw new HttpError("Invalid password", 401);
    }



    const token = await jwt.sign({
      email: user.email, _id: user._id
    }, "123456", {
      expiresIn: '24h'
    })
    return res.status(200).json({
      response: 200,
      message: "Login Successful",
      status: true,
      data: { user, token },
    });
  } catch (error) {


    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        response: error.statusCode,
        message: error.message,
        status: false,
        data :{
          user: {
            id: null,
            username: "",
            email: "",
            password: "",
            imageURL: null,
            UserType: null,
            Role: null,
            createdAt: null,
            updatedAt: null,
          },
          token: null,
        }
      });
    }
    
    
    else {
      return res.status(400).json({
        response: 400,
        message: "Sign-in Failed",
        status: false,
        error: error.message,
      });
    }  }

}




const getUserByID = async(req,res)=>{
  try {
    console.log("heppu");
    const id = req.params.id

    const users = await User.findByPk(id)
    return res.status(200).json({
      response: 200,
      message: "User Details",
      status: true,
      data: users,
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