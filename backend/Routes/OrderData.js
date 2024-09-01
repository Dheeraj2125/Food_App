const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Order = require('../models/Orders');

// Order Data route
router.post('/orderData', asyncHandler(async (req, res) => {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    let existingOrder = await Order.findOne({ 'email': req.body.email });

    if (!existingOrder) {
        await Order.create({
            email: req.body.email,
            order_data: [data]
        });
        // console.log("Data created:", data);
        res.json({ success: true });
    } else {
        await Order.findOneAndUpdate(
            {email:req.body.email},
            { $push: { order_data: data } }
        );
        // console.log("Data updated:", data);
        res.json({ success: true });
    }
}));

// MyOrderData route
router.post('/myorderdata', asyncHandler(async (req, res) => {
    let eId = await Order.findOne({ 'email': req.body.email });
    res.json({ orderData: eId });
}));

module.exports = router;
