// const express = require('express');
// const signup = require('./controller');

// const user_router = express.Router();
// console.log("Hello from userroute.js");
// user_router.post('/signup' , signup)
// /**
//  * @swagger
//  * tags:
//  *   name: Users
//  *   description: Operations related to users
//  * /signup:
//  *   post:
//  *     summary: Register a new user
//  *     description: Endpoint to register a new user.
//  *     tags: [Users]
//  *     requestBody:
//  *       description: User registration details
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'  // Reference the User schema
//  *     responses:
//  *       200:
//  *         description: User registered successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 response:
//  *                   type: number
//  *                 message:
//  *                   type: string
//  *                 status:
//  *                   type: boolean
//  *                  
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 response:
//  *                   type: number
//  *                 message:
//  *                   type: string
//  *                 status:
//  *                   type: boolean
//  *                 error:
//  *                   type: string
//  */

// module.exports = user_router;
