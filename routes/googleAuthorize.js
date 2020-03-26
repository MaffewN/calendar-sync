var express = require('express');
var router = express.Router();

/* GET /authorize. */
router.get('/', async function(req, res, next) {
  
    res.redirect('/google-calendar');
  });

module.exports = router;
