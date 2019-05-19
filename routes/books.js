let express = require('express');
let router = express.Router();
const auth = require('../firebase-midleware/auth');
const bookModel = require('../models/books');
// const config = require('/config/firebase-config');
/* GET home page. */
router.get('/', auth.protect, function (req, res) {
    let book;
    let books = [];
    bookModel.getAll().then((snapshot) => {
        snapshot.forEach((doc) => {

            book = new bookModel.createBook(doc.get("Title"), doc.id, doc.get("Author"), doc.get("Description"), doc.get("Year"), doc.get("Genre"), doc.get("HeaderImage"), doc.get("Image"), doc.get("IsActive"), doc.get("Publisher"), doc.get("rating"));
            books.push(book);

        });
        res.render('books', {
            title: "Книги",
            user: req.user,
            books: books
        });
    }).catch((err) => {
        res.send(err);
    });

});
router.get('/:id', auth.protect, function (req, res) {
    const bookId = req.params.id;
    bookModel.getByid(bookId).then(doc => {
        if (!doc.exists) {
            res.redirect("/");
        } else {

            const book = new bookModel.createBook(doc.get("Title"), doc.id, doc.get("Author"), doc.get("Description"), doc.get("Year"), doc.get("Genre"), doc.get("HeaderImage"), doc.get("Image"), doc.get("IsActive"), doc.get("Publisher"), doc.get("rating"));
            res.render('book', {
                title: book.title,
                Title: book.title,
                Author: book.author,
                Genre: book.genre,
                Year: book.year,
                Publisher: book.publisher,
                Description: book.description,
                HeaderImage: book.headerImage,
                Image: book.image,
                user: req.user,
                Rating: book.rating,
                isAviable: false
            });
        }
    })
        .catch(err => {
            return err;
        });

});
module.exports = router;
