let express = require('express');
let router = express.Router();
const auth = require('../auth/auth');
/* GET home page. */
router.get('/', auth.isAuntificated, function(req, res, next) {
  //console.log(req.user);
  res.render("index", {
    title: "Головна сторінка",
    user: req.user
  });
});
module.exports = router;
