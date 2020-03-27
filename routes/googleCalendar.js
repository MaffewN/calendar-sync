var { google } = require('googleapis');
var express = require('express')
var router = express.Router();
var OAuth2Data = require('./google_key.json')

var CLIENT_ID = OAuth2Data.web.client_id;
var CLIENT_SECRET = OAuth2Data.web.client_secret;
var REDIRECT_URL = OAuth2Data.web.redirect_uris;

var oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

router.get('/', async function(req, res, next) {
  let parms = { title: 'Google Calendar', active: { googleCalendar: true } };

    if (!authed) {
        // Generate an OAuth URL and redirect there
        var url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
        });
        console.log(url)
        res.redirect(url);
    } else {
        var gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        gmail.users.labels.list({
            userId: 'me',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            var labels = res.data.labels;
            if (labels.length) {
                console.log('Labels:');
                labels.forEach((label) => {
                    console.log(`- ${label.name}`);
                });
            } else {
                console.log('No labels found.');
            }
        });
        res.send('Logged in')
    }
})

router.get('/auth/google/callback', async function (req, res, next) {
    var code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/google-calendar');
            }
        });
    }
});

module.exports = router;