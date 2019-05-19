let express = require('express');
let router = express.Router();
const auth = require('../firebase-midleware/auth');
const bookModel = require('../models/books');
const orderModel = require('../models/orders');


router.get('/', auth.protect, function (req, res) {
    let order;
    let orders = [];
    let bookId;
    let endDate;
    orderModel.getAll().then((snapshot) => {
        //TODO Добавить в заказ начальную дату окончания 1900 год
        // Отображать только активые заказы
        snapshot.forEach((doc) => {
            endDate = doc.get("End");
            let date = endDate.toDate();
            if (date.toISOString() === "0120-01-01T11:57:56.000Z") {
                if (req.user.uid.toString() === doc.get("UserId")) {
                    let start = doc.get("Start").toDate();
                    order = orderModel.order(doc.get("End"), start.toLocaleDateString("en-US"), req.user.uid, doc.get("bookId").id, doc.id);
                    orders.push(order);
                }
            }
        });
        // res.render('orders', {
        //     books: books,
        //     orders: orders
        // });
        console.log(orders);
        res.send("123");
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/cancel/:id', function (req, res) {
    const orderId = req.params.id;
    console.log(orderId);
    orderModel.setEndDate(orderId).then(() => {
        res.send("123");
    });
});

router.get('/new',function (req, res) {
    //TODO получать данные с форм, книгу делать недоступной
        const end = new Date();
        const bookId = "123123123123131231";
        const id = "1231231";
        orderModel.newOrder(id, bookId, end).then(()=>{
            res.redirect('/');
        }).catch((err) =>{
                    res.send("123");
    });

});
module.exports = router;
