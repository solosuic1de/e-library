const firebase = require('../firebase-midleware/firestorage');

function Order(end, start, userId, bookId, id) {
    this.end = end;
    this.start = start;
    this.userId = userId;
    this.bookId = bookId;
    this.id = id;
}

module.exports = {
    getAll: function () {
        return firebase.db.collection('Orders').get();
    },
    getById: function () {
        const order = firebase.db.collection('Orders').doc(id);
        return order.get();
    },
    order: function (end, start, userId, bookId, id) {
        return new Order(end, start, userId, bookId, id);
    },
    newOrder: function (userId, bookId) {
        const start = new Date().toISOString();
        return new Order(null, start, userId, bookId, null);
    },
    setEndDate: function (order) {
        order.end = new Date().toISOString();
    }
};
