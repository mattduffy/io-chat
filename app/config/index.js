'use strict';
let app_config = require('dotenv').config();

// create module specific key value entries in the config obj.
// Passport Facebook entries.
// coalesce Facebook env vars into a single fb obj
let fb = {
 'clientId': app_config.fb_app_id,
 'clientSecret': app_config.fb_app_secret,
 'callBackUrl': "//localhost:3000/auth/facebook/callback",
 'profileFields': ['id', 'displayName', 'photos']
};
// delete original Facebook env vars after coalescing.
delete app_config.fb_app_id;
delete app_config.fb_app_secret;
app_config.fb = fb;

module.exports = app_config;
