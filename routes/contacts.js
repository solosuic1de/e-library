let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/contacts', function(req, res) {
    res.render('contacts');
});

module.exports = router;
