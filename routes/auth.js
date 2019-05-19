let express = require('express');
let router = express.Router();
const auth = require('../firebase-midleware/auth');
// const config = require('/config/firebase-config');
/* GET home page. */
router.get('/login', function (req, res) {

    res.render('login', {
        title: "Вхід в кабінет",
        user: null
    });
});
router.post('/login', function (req, res) {
    const email = req.body.email;
    const pass = req.body.password;
    auth.login(email, pass).then(() => {
            res.redirect("/");
        }
    ).catch((e) => {
        res.redirect("/login");
    })
});
router.get('/logout', auth.protect, function (req, res) {
    auth.logout();
    res.redirect("/");
});
module.exports = router;
