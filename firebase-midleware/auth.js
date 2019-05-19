const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
const config = require('../config/firebase-config');
firebase.initializeApp(config);

module.exports = {
    protect: function (req, res, next) {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            req.user = user;
            next();
        } else {
            res.redirect('/login');
        }
    },
    isAuntificated: function (req, res, next) {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            req.user = user;
            next();
        }
        next();

    },
    registration: function (email, password) {

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode || errorMessage)
                return errorCode.toString() + " " + errorMessage.toString();
        });
    },
    login: function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logout: function () {
        return firebase.auth().signOut();
    }
};

