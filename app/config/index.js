'use strict';
let app_cfg = require('dotenv').config();
app_cfg.HOST = process.env.HOST || 'localhost';

// create module specific key value entries in the config obj.
// Passport Facebook entries.
// coalesce Facebook env vars into a single fb obj
let fb = {
 'clientID': app_cfg.fb_app_id,
 'clientSecret': app_cfg.fb_app_secret,
 'callbackURL': "//"+ app_cfg.HOST +":"+ app_cfg.PORT +"/auth/facebook/callback",
 'profileFields': ['id', 'displayName', 'photos']
};
// delete original Facebook env vars after coalescing.
delete app_cfg.fb_app_id;
delete app_cfg.fb_app_secret;
app_cfg.fb = fb;

module.exports = app_cfg;
