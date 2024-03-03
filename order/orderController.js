const express = require('express')

const order = require('../order/orderModel');
const orderDetails = require('../orderDetails/orderDetailsModels');

//add orders

const addOrders = async (req, res) => {
    try {
        const data = {
            order_by: req.body.order_by,
            order_by_address: req.body.order_by_address,
            order_by_email: req.body.order_by_email,
            order_by_name: req.body.order_by_name,
            order_by_phone: req.body.order_by_phone,
            order_by_postalcode: req.body.order_by_postalcode,
            order_by_state: req.body.order_by_state,
            order_code: req.body.order_code,
            order_confirmed: req.body.order_confirmed,
            order_date: req.body.order_date,
            order_delivered: req.body.order_delivered,
            order_on_delivery: req.body.order_on_delivery,
            order_placed: req.body.order_placed,
            payment_method: req.body.payment_method,
            shipping_method: req.body.shipping_method,
            totalAmount: req.body.totalAmount,
            user_id: req.body.user_id,
            product_id: req.body.product_id
        };

        const createdOrder = await order.create(data);
        console.log(createdOrder);
        console.log(req.body.order_code);
        let createDetails;
        if (createdOrder) {
            for (let i = 0; i < req.body.order_details.length; i++) { // Corrected loop condition
                const orderDetailData = req.body.order_details[i]; // Extract details from req.body.order_details[i]
                const detailData = {
                    order_id: createdOrder.id,
                    order_code: req.body.order_code,
                    Color: orderDetailData.Color,
                    img: orderDetailData.img,
                    title: orderDetailData.title,
                    vendor_id: orderDetailData.vendor_id,
                    qty : orderDetailData.qty,
                    tprice : orderDetailData.tprice
                };
                console.log(detailData, "detailData");
                createDetails = await orderDetails.create(detailData);
            }
        }
        const response = {
            orders: createdOrder,
            orderDetails: createDetails
        }
        console.log(createdOrder);
        return res.status(201).json(response);
    } catch (error) {
        console.error(error.message, "err");
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



//get orders

const getOrders = async (req, res) => {
    try {
        const AllOrders = await order.findAll(
            {
                include: [{
                    model: orderDetails,
                    required: false,
                    //   attributes: ['order_code' ] 
                }]
            }
        )

        let dataArray = AllOrders.map((item) => {
            let orderConfirmed;
            let orderDelivered;
            let orderPlaced;
            let orderOnDelivery;
            if (item.order_on_delivery == '1') {
                orderOnDelivery = true
                item.order_on_delivery = orderOnDelivery

            }
            else if (item.order_on_delivery == '0') {
                orderOnDelivery = false
                item.order_on_delivery = orderOnDelivery

            }
            if (item.order_placed == '1') {
                orderPlaced = true
                item.order_placed = orderPlaced

            }
            else if (item.order_placed == '0') {
                orderPlaced = false
                item.order_placed = orderPlaced

            }
            if (item.order_delivered == '1') {
                orderDelivered = true
                item.order_delivered = orderDelivered

            }
            else if (item.order_delivered == '0') {
                orderDelivered = false
                item.order_delivered = orderDelivered

            }
            if (item.order_confirmed == '1') {
                orderConfirmed = true
                item.order_confirmed = orderConfirmed
            }
            else if (item.order_confirmed == '0') {
                orderConfirmed = false
                item.order_confirmed = orderConfirmed
            }

            return {
                // order_confirmed: orderConfirmed,
                ...item.toJSON() // Convert Sequelize model instance to plain object
            };
        });

        res.status(200).json(dataArray);
    } catch (error) {
        console.log(error, "err");
        return error
    }

    //get orderbyId




}

const getOrdersByID = async (req, res) => {
    try {
        const id = req.params.id;
        const orderByPk = await order.findOne({
            where: { id: id },
            include: [{
                model: orderDetails,
                required: false,
                // attributes: ['image_link']
            }]
        });

        if (!orderByPk) {
            return res.status(404).send("Order not found");
        }

        let orderConfirmed;
        let orderDelivered;
        let orderPlaced;
        let orderOnDelivery;

        if (orderByPk.order_on_delivery == '1') {
            orderOnDelivery = true;
            orderByPk.order_on_delivery = orderOnDelivery;
        } else if (orderByPk.order_on_delivery == '0') {
            orderOnDelivery = false;
            orderByPk.order_on_delivery = orderOnDelivery;
        }
        if (orderByPk.order_placed == '1') {
            orderPlaced = true;
            orderByPk.order_placed = orderPlaced;
        } else if (orderByPk.order_placed == '0') {
            orderPlaced = false;
            orderByPk.order_placed = orderPlaced;
        }
        if (orderByPk.order_delivered == '1') {
            orderDelivered = true;
            orderByPk.order_delivered = orderDelivered;
        } else if (orderByPk.order_delivered == '0') {
            orderDelivered = false;
            orderByPk.order_delivered = orderDelivered;
        }
        if (orderByPk.order_confirmed == '1') {
            orderConfirmed = true;
            orderByPk.order_confirmed = orderConfirmed;
        } else if (orderByPk.order_confirmed == '0') {
            orderConfirmed = false;
            orderByPk.order_confirmed = orderConfirmed;
        }

        return res.send(orderByPk);
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send("Internal Server Error");
    }
};



const getOrdersByuserID = async (req, res) => {
    try {
        const user_id = req.params.user_id
        console.log(user_id);
        const orders = await order.findAll({
            where: { user_id: user_id }
            , include: [{
                model: orderDetails,
                required: false,
                // attributes: ['image_link'] 
            }]
        },)
        let data
        console.log("hfjdnfuifjnu");
        if (orders.length > 0) {
            let dataArray = orders.map((item) => {
                let orderConfirmed;
                let orderDelivered;
                let orderPlaced;
                let orderOnDelivery;
                if (item.order_on_delivery == '1') {
                    orderOnDelivery = true
                    item.order_on_delivery = orderOnDelivery
    
                }
                else if (item.order_on_delivery == '0') {
                    orderOnDelivery = false
                    item.order_on_delivery = orderOnDelivery
    
                }
                if (item.order_placed == '1') {
                    orderPlaced = true
                    item.order_placed = orderPlaced
    
                }
                else if (item.order_placed == '0') {
                    orderPlaced = false
                    item.order_placed = orderPlaced
    
                }
                if (item.order_delivered == '1') {
                    orderDelivered = true
                    item.order_delivered = orderDelivered
    
                }
                else if (item.order_delivered == '0') {
                    orderDelivered = false
                    item.order_delivered = orderDelivered
    
                }
                if (item.order_confirmed == '1') {
                    orderConfirmed = true
                    item.order_confirmed = orderConfirmed
                }
                else if (item.order_confirmed == '0') {
                    orderConfirmed = false
                    item.order_confirmed = orderConfirmed
                }

                return {
                    // order_confirmed: orderConfirmed,
                    ...item.toJSON() // Convert Sequelize model instance to plain object
                };
            });
            data = {
                message: "result",
                orders: dataArray
            }
        } else {

            data = {
                message: "result",
                orders: []
            }
        }


        console.log("uefuhwefhwef");
        return res.send(data)
    } catch (error) {
        return error
    }
}
module.exports = { addOrders, getOrdersByID, getOrders, getOrdersByuserID }




//alter table orderDetails
// add column tprice INT default null
// alter table orderDetails
// add column qty INT default null