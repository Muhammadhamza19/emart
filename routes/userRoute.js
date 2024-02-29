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
const { signup, login, getUserByID, updatePassword } = require('../Users/controller');
const { addProduct, getProduct, getProductByCategory, getProductBySubCategory, getProductByFeature , searchProduct , updateFeatureOfProduct } = require('../product/productController');
const { addOrders, getOrdersByID, getOrders , getOrdersByuserID } = require('../order/orderController')
const { addcart,removeCart, getSpecificCart, getUserCart , removeallCartbyuserId} = require('../cart/cartController')
const {removeWishlistByUserAndProductID, addtowishlist, listWishList, getSpecificWishList, removeWishListItem, getWishListByProductIDAndUserId, countItemByUser_id } = require('../wishlist/wishController')
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
 *               UserType : 
 *                 type : number 
 *               imageURL : 
 *                 type : string
 * 
 * 
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
 *               email:
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
 *               category_name:
 *                 type: string
 *               sub_category_name:
 *                 type: string
 *               seller_name : 
 *                 type : string
 *               vendor_id : 
 *                 type : number
 *               images : 
 *                 type : array
 *                 items :
 *                   type : string
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
 *                 type: number
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
 *               order_details : 
 *                 type : array
 *                 items :
 *                   type : object
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
router.get('/orders', getOrders)


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
router.get('/orders/:id', getOrdersByID)



/**
 * @swagger
 * /getUserByID/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               response: 200
 *               message: User Details
 *               status: true
 *               data:
 *                 _id: 1
 *                 username: john_doe
 *                 email: john@example.com
 *                 imageURL: http://example.com/image.jpg
 *                 UserType: 2
 *                 Role: user
 *       400:
 *         description: Error response
 *         content:
 *           application/json:
 *             example:
 *               response: 400
 *               message: something went wrong
 *               status: false
 *               error: Error message details
 */
router.get('/getUserByID/:id', getUserByID);

/**
 * @swagger
 * /getProductBySubCategory/{subcategory}:
 *   get:
 *     summary: Get product details 
 *     tags: [Product]
 *     parameters:
 *       - name: subcategory
 *         in: path
 *         description: category name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.get('/getProductBySubCategory/:subcategory', getProductBySubCategory);




/**
 * @swagger
 * /getProductByCategory/{category}:
 *   get:
 *     summary: Get product details 
 *     tags: [Product]
 *     parameters:
 *       - name: category
 *         in: path
 *         description: category name
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */

router.get('/getProductByCategory/:category', getProductByCategory);



/**
 * @swagger
 * /addcart:
 *   post:
 *     summary: Add an item to the shopping cart
 *     tags: [Shopping Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               vendor_id:
 *                 type: number
 *               color:
 *                 type: string
 *               quality:
 *                 type: integer
 *               seller_name:
 *                 type: string
 *               title:
 *                 type: string
 *               tprice:
 *                 type: number
 *               product_id :
 *                 type : number
 *     responses:
 *       201:
 *         description: Item added successfully
 *           
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
router.post('/addcart', addcart);


/**
 * @swagger
 * /getcartByUserID/{user_id}:
 *   get:
 *     summary: Get car details 
 *     tags: [Shopping Cart]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description:  get by userid
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.get('/getcartByUserID/:user_id', getUserCart);






/**
 * @swagger
 * /getcartByID/{cartId}:
 *   get:
 *     summary: Get car details 
 *     tags: [Shopping Cart]
 *     parameters:
 *       - name: cartId
 *         in: path
 *         description:  get by id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.get('/getcartByID/:cartId', getSpecificCart);








/**
 * @swagger
 * /add/wishlist:
 *   post:
 *     summary: Add an item to the shopping wishlist
 *     tags: [Wish List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               product_id:
 *                 type: number
 *               is_active:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added successfully
 *           
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
router.post('/add/wishlist', addtowishlist);


/**
 * @swagger
 * /getWishListByUserID/{user_id}:
 *   get:
 *     summary: Get car details 
 *     tags: [Wish List]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description:  get by userid
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.get('/getWishListByUserID/:user_id', listWishList);






/**
 * @swagger
 * /getWishListByID/{WishList_id}:
 *   get:
 *     summary: Get car details 
 *     tags: [Wish List]
 *     parameters:
 *       - name: WishList_id
 *         in: path
 *         description:  get by id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.get('/getWishListByID/:WishList_id', getSpecificWishList);


/**
 * @swagger
 * /getProductByFeature/{isFeature}:
 *   get:
 *     summary: Get products by feature
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: isFeature
 *         required: true
 *         schema:
 *           type: boolean
 *         description: Boolean parameter to indicate whether to include products with the specified feature
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No products found with the specified feature
 */

router.get('/getProductByFeature/:isFeature', getProductByFeature);


/**
 * @swagger
 * /removeWishList/{WishList_id}:
 *   put:
 *     summary: remove wishlist item
 *     tags: [Wish List]
 *     parameters:
 *       - name: WishList_id
 *         in: path
 *         description:  update by id
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successful operation
 *         
 *       400:
 *         description: Error response
 *      
 */
router.put('/removeWishList/:WishList_id', removeWishListItem);


/**
 * @swagger
 * /ByProductIDAndUserId/{user_id}/{product_id}:
 *   get:
 *     summary: get wishlist item
 *     tags: [Wish List]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: product_id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error response
 */
router.get('/ByProductIDAndUserId/:user_id/:product_id', getWishListByProductIDAndUserId);


/**
 * @swagger
 * /countItemByUser_id/{user_id}:
 *   get:
 *     summary: get wishlist item count
 *     tags: [Wish List]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error response
 */
router.get('/countItemByUser_id/:user_id', countItemByUser_id);


/**
 * @swagger
 * /update/password:
 *   post:
 *     summary: Add an item to the shopping wishlist
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: password updated successfully
 *           
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
router.post('/update/password', updatePassword);


/**
 * @swagger
 * /remove/{user_id}/{product_id}:
 *   put:
 *     summary: Remove wishlist item
 *     tags: [Wish List]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: product_id
 *         in: path
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error response
 */
router.put('/remove/:user_id/:product_id', removeWishlistByUserAndProductID);



/**
 * @swagger
 * /removeCart/{id}/{product_id}:
 *   delete:
 *     summary: Remove wishlist item
 *     tags: [Wish List]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: cart ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: product_id
 *         in: path
 *         description: product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error response
 */
router.delete('/removeCart/:id/:product_id', removeCart);


/**
 * @swagger
 * /searchProduct/{product_name}:
 *   get:
 *     summary: Get products by feature
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: product_name
 *         required: true
 *         schema:
 *           type: string
 *         description: string parameter to indicate whether to include products with the specified feature
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No products found with the specified feature
 */

router.get('/searchProduct/:product_name', searchProduct);




/**
 * @swagger
 * /ordersbyuser/{user_id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: user_id
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
router.get('/ordersbyuser/:user_id', getOrdersByuserID)


/**
 * @swagger
 * /updateFeature:
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
 *               isFeature:
 *                 type: boolean
 *               vendor_id : 
 *                 type : number
 *               product_id : 
 *                 type : number
 *     responses:
 *       200:
 *         description: Successfully created product
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/updateFeature', updateFeatureOfProduct);



/**
 * @swagger
 * /removeCartByUserID/{user_id}:
 *   delete:
 *     summary: Remove wishlist item
 *     tags: [Wish List]
 *     parameters:
 *       - name: user_id
 *         in: path
 *         description: cart user_id ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Error response
 */
router.delete('/removeCartByUserID/:user_id', removeallCartbyuserId);



module.exports = router;
