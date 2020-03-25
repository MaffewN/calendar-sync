var express = require('express');
var router = express.Router();

/* GET /authorize. */
router.get('/', async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
  
    // If code is present, use it
    if (code) {
      try {
        await authHelper.getTokenFromCode(code, res);
        // Redirect to home
        res.redirect('/google-calendar');
      } catch (error) {
        res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
      }
    } else {
      // Otherwise complain
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  });

module.exports = router;
