let express = require('express');
let router = express.Router();
const auth = require('../firebase-midleware/auth');
const bookModel = require('../models/books');
const orderModel = require('../models/orders');


router.get('/', auth.protect, function (req, res) {
    let order;
    let book;
    let orders = [];
    let books = [];
    let bookId;
    let endDate;
    orderModel.getAll().then((snapshot) => {
        //TODO Добавить в заказ начальную дату окончания 1900 год
        // Отображать только активые заказы
        snapshot.forEach((doc) => {
            endDate = doc.get("End");
            console.log(endDate.toDate());
            if (!endDate || endDate === "") {
                if (req.user.uid === doc.get("UserId")) {
                    bookId = doc.get("bookId");
                    order = orderModel.order(doc.get("End"), doc.get("Start"), req.user.uid, bookId);
                    bookModel.getByid(bookId).then(doc => {
                        if (!doc.exists) {
                            book = null;
                        } else {
                            book = new bookModel.book(doc.get("Title"), doc.id, doc.get("Author"), doc.get("Description"), doc.get("Year"), doc.get("Genre"), doc.get("HeaderImage"), doc.get("Image"), doc.get("IsActive"), doc.get("Publisher"), doc.get("rating"));
                        }
                    });
                    orders.push(order);
                    books.push(book);
                }
            }
        });
        // res.render('orders', {
        //     books: books,
        //     orders: orders
        // });
        console.log(orders);
        console.log(books);
        res.send("123");
    }).catch((err) => {
        res.send(err);
    });

})
;
module.exports = router;
