const firebase = require('../firebase-midleware/firestorage');


module.exports = {
    getAll: function () {
        return firebase.db.collection('Orders').get();
    },
};
