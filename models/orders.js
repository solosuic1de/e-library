const firebase = require('../firebase-midleware/firestorage');
const uuidv4 = require('uuid/v4');


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
    newOrder: function (userId, bookId, endDate, ) {
        const start = new Date();
       const order = {
           "End": endDate,
           "Start": start,
           "UserId": userId,
           "bookId": bookId
       };
        return  firebase.db.collection('Orders').doc(uuidv4()).set(order);
    },
    setEndDate: function (orderId) {
        let date = new Date();
       return  firebase.db.collection("Orders").doc(orderId).update({
            "End": date
        });

    }
};
