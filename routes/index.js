let express = require('express');
let router = express.Router();
const auth = require('../auth/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index');
});

module.exports = router;
