// /**
//  * @swagger
//  * /api/signup:
//  *   post:
//  *     summary: User signup
//  *     description: Creates a new user account
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               username:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User signed up successfully
//  */


// /**
//  * @swagger
//  * /api/login:
//  *   post:
//  *     summary: User login
//  *     description: Authenticates a user and returns an authentication token
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login successful
//  *         content:
//  *           application/json:
//  *             example:
//  *               response: 200
//  *               message: Login Successful
//  *               status: true
//  *               data:
//  *                 user:
//  *                   type: object
//  *                   properties:
//  *                     _id:
//  *                       type: string
//  *                     username:
//  *                       type: string
//  *                     email:
//  *                       type: string
//  *                 token:
//  *                   type: string
//  *       401:
//  *         description: Authentication failed
//  *         content:
//  *           application/json:
//  *             example:
//  *               response: 401
//  *               message: Authentication Failed
//  *               status: false
//  *               error: Invalid email or password
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             example:
//  *               response: 500
//  *               message: Internal Server Error
//  *               status: false
//  *               error: Error message
//  */

// /**
//  * @swagger
//  * /addProduct:
//  *   post:
//  *     summary: Create a new product
//  *     tags:
//  *       - Product
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               product_name:
//  *                 type: string
//  *               product_color:
//  *                 type: string
//  *               product_price:
//  *                 type: number
//  *               isFeature:
//  *                 type: boolean
//  *               product_desc:
//  *                 type: string
//  *               product_image:
//  *                 type: string
//  *               product_quantity:
//  *                 type: number
//  *               category_id:
//  *                 type: number
//  *               sub_category_id:
//  *                 type: number
//  *     responses:
//  *       200:
//  *         description: Successfully created product
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */






// const express = require('express');
// const {signup , login} = require('../Users/controller');
// const {addProduct} = require('../product/productController')
// const router = express.Router();

// router.post('/api/signup', signup);
// router.post('/api/login', login);
// router.post('/addProduct' , addProduct)

// // Your route logic goes 

// module.exports = router;
const express = require('express');
const { signup, login } = require('../Users/controller');
const { addProduct , getProduct } = require('../product/productController');
const {addOrders ,getOrdersByID , getOrders} = require('../order/orderController')
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User signup
 *     description: Creates a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered user
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/api/signup', signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in as an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/api/login', login);

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               product_color:
 *                 type: string
 *               product_price:
 *                 type: number
 *               isFeature:
 *                 type: boolean
 *               product_desc:
 *                 type: string
 *               product_image:
 *                 type: string
 *               product_quantity:
 *                 type: number
 *               category_id:
 *                 type: number
 *               sub_category_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully created product
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/addProduct', addProduct);

/**
 * @swagger
 * /getProduct:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 product_name: Sample Product 1
 *                 createdAt: 2024-01-24T12:00:00Z
 *                 updatedAt: 2024-01-24T12:30:00Z
 *               - id: 2
 *                 product_name: Sample Product 2
 *                 createdAt: 2024-01-25T10:00:00Z
 *                 updatedAt: 2024-01-25T10:45:00Z
 *       500:
 *         description: Internal server error
 */

router.get('/getProduct', getProduct);




/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_by:
 *                 type: string
 *               order_by_address:
 *                 type: string
 *               order_by_email:
 *                 type: string
 *               order_by_name:
 *                 type: string
 *               order_by_phone:
 *                 type: string
 *               order_by_postalcode:
 *                 type: string
 *               order_by_state:
 *                 type: string
 *               order_code:
 *                 type: string
 *               order_confirmed:
 *                 type: string
 *               order_date:
 *                 type: string
 *               order_delivered:
 *                 type: string
 *               order_on_delivery:
 *                 type: string
 *               order_placed:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               shipping_method:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *               user_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             example:
 *               order_by: John Doe
 */

router.post('/orders', addOrders);



/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               - order_by: John Doe
 */
router.get('/orders' , getOrders)


/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               order_by: John Doe
 *       404:
 *         description: Order not found
 */
router.get('/orders/:id' , getOrdersByID)


module.exports = router;
