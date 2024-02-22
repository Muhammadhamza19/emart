const express = require('express')

const order = require('../order/orderModel');

//add orders

const addOrders = async(req,res)=>{
try {
const data = req.body
    const creatOrders = await order.create(data)
console.log(creatOrders)
return res.status(201).json(creatOrders); 

} catch (error) {
    return error
}

}


//get orders

const getOrders = async(req,res)=>{
try {
    const AllOrders = await order.findAll()
    return res.send(AllOrders)
} catch (error) {
    return error
}

//get orderbyId




}

const getOrdersByID = async(req,res)=>{
    try {
        const id = req.params.id
        const orders = await order.findByPk(id)
        return res.send(orders)
    } catch (error) {
        return error
    }
}


const getOrdersByuserID = async(req,res)=>{
    try {
        const user_id = req.params.user_id
        console.log(user_id);
        const orders = await order.findAll({where :{user_id : user_id}})
        let data
        console.log("hfjdnfuifjnu");
        if(orders.length >0){   
                 data = {
                    message : "result",
                    orders : orders
                 }
        }else {

            data = {
                message : "result",
                orders : []
            }
             } 
             
             
             console.log("uefuhwefhwef");
            return res.send(data)
            } catch (error) {
        return error
    }
}
module.exports = {addOrders ,getOrdersByID , getOrders ,getOrdersByuserID}