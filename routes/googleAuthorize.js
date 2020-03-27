var express = require('express');
var router = express.Router();
var oAuth2Client = require('../helpers/googleAuth');

/* GET /authorize. */
router.get('/', async function(req, res, next) {
  
    // Get auth code
    const code = req.query.code;
  
    // If code is present, use it
    if (code) {
      try {
        await oAuth2Client.generateAuthUrl(code, res);
        // Redirect to home
        res.redirect('/outlook-calendar');
      } catch (error) {
        res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
      }
    } else {
      // Otherwise complain
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  });

module.exports = router;
