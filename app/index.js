'use strict';

module.exports = {
  config: require('./config'),
  router: require('./routes')(),
  session: require('./session')
}
