const path = require('path');

const platform = process.env.PLATFORM || 'mobile'; // Default to 'mobile'

if (platform === 'web') {
  module.exports = require('./metro.config.web.js');
} else if (platform === 'mobile') {
  module.exports = require('./metro.config.mobile.js');
} else {
  throw new Error(
    "❌ Invalid PLATFORM value. Use 'PLATFORM=web' or 'PLATFORM=mobile'."
  );
}
