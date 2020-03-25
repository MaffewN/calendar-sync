var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/outlookAuth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Google Calendar', active: { googleCalendar: true } };

  res.render('google-calendar', parms);
});

module.exports = router;