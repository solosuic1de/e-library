let express = require('express');
let router = express.Router();
const auth = require('../auth/auth');
// const config = require('/config/firebase-config');
/* GET home page. */
router.get('/', auth.protect, function(req, res) {
    console.log(req.user.uid);
    res.render('books');
});
module.exports = router;
