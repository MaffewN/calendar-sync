var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next){
    let parms = { title: 'Event', active: { event: true } };

    res.render('event', parms);
});

module.exports = router;