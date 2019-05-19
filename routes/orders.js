let express = require('express');
let router = express.Router();
const auth = require('../firebase-midleware/auth');
const bookModel = require('../models/books');
const orderModel = require('../models/orders');

router.get('/', auth.protect, function (req, res) {
    let order;
    let orders = [];
    orderModel.getAll().then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(req.user.uid);
            console.log(doc.get("UserId"));
            if(req.user.uid === doc.get("UserId"))
            {
                console.log("succ");
                order = doc.get();
                orders.push(order);
            }

        });
       res.send("123");
    }).catch((err) => {
        res.send(err);
    });

});
module.exports = router;
