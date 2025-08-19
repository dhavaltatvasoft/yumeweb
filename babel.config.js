// babel.config.js

const isWeb = process.env.BABEL_ENV === 'web' || process.env.NODE_ENV === 'web';

module.exports = isWeb
  ? require('./babel.config.web.js')
  : require('./babel.config.mobile.js');
