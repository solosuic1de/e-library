const admin = require('firebase-admin');
const config = require('../config/firebase-storage-config');

admin.initializeApp({
    credential: admin.credential.cert(config)
});
const db = admin.firestore();

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
        return db.collection('Books').get();
    },
    getByid: function (id) {
        let bookRef = db.collection('Books').doc(id);
        return bookRef.get();

    },
    createBook: function (title, id, author, description, year, genre, headerImage, image, isActive, publisher, rating) {
        return new Book(title, id, author, description, year, genre, headerImage, image, isActive, publisher, rating);
    }
};
