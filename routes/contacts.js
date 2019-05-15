let express = require('express');
let router = express.Router();
const auth = require('../auth/auth');
/* GET home page. */
router.get('/contacts', auth.isAuntificated, function (req, res) {

    res.render('contacts', {
        title: "Контакти",
        user: req.user
    });
});

module.exports = router;
