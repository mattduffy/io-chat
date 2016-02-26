'use strict';
const cfg = require('./config');
require('./auth')(cfg);

module.exports = {
  config: cfg,
  router: require('./routes')(),
  session: require('./session')
};
