const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js');
const User = require('./Users/usermodel');
const sequelize = require('./config/connectionDB');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8080;
const userRoutes = require('./routes/userRoute.js')
const product = require('./product/productModel.js')
const category = require('./category/categoryModel.js')
const sub_category  = require('./sub_category/subCategoryModel.js')
const order = require('./order/orderModel.js')
const cart = require('./cart/cartModels.js')
const wishlist = require('./wishlist/wishlistModel.js')
const imageProduct = require('./images/imageModels.js')
const orderDetails = require('./orderDetails/orderDetailsModels.js')
// Initialize database connection
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Synchronize the model with the database
    await User.sync();
    await category.sync();
await sub_category.sync();
await product.sync();
await order.sync();
await cart.sync()
await wishlist.sync()
await imageProduct.sync()
await orderDetails.sync()



    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();
// Use the user_router for your application routes
// app.use(user_router);
app.use(userRoutes);

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
