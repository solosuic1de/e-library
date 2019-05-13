const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');


router.get('/', function (req, res, next) {
    auth.login("solosuicide133@gmail.com", "112263King");
    res.redirect("/");
});
module.exports = router;
