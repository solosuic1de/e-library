const config = require('../config/firebase-storage-config');
const admin = require('firebase-admin/lib/index');

admin.initializeApp({
    credential: admin.credential.cert(config)
});
const  db = admin.firestore();

module.exports = {
    db
};

