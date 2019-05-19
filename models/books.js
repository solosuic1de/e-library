const firebase = require('../firebase-midleware/firestorage');


function Book(title, id, author, description, year, genre, headerImage, image, isActive, publisher, rating) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.year = year;
    this.genre = genre;
    this.headerImage = headerImage;
    this.image = image;
    this.isActive = isActive;
    this.publisher = publisher;
    this.rating = rating;
    this.id = id;
}

module.exports = {
    getAll: function () {
        return firebase.db.collection('Books').get();
    },
    getByid: function (id) {
        let bookRef = firebase.db.collection('Books').doc(id);
        return bookRef.get();

    },
    book: function (title, id, author, description, year, genre, headerImage, image, isActive, publisher, rating) {
        return new Book(title, id, author, description, year, genre, headerImage, image, isActive, publisher, rating);
    },
    changeAviable: function (book) {
        if (book.isActive) {
            book.isActive = false;
        } else {
            book.isActive = true;
        }
    },

};
