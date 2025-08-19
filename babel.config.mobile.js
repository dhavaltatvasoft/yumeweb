// mobile/babel.config.js

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins can go here
    'react-native-reanimated/plugin', // 🔴 MUST BE LAST
  ],
};
