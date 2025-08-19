const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.resolve(__dirname, 'index.web.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
    // ❌ REMOVE: libraryTarget: 'commonjs2' — this breaks browser execution!
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      '.json',
    ],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-masked-view': '@react-native-masked-view/masked-view',
      'react-native-svg': 'react-native-svg-web',
    },
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      // ✅ This forces .js files to be treated as CommonJS when needed
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules\/(?!(react-native|react-native-web|react-native-reanimated|@react-native|@react-navigation|react-native-gesture-handler|react-native-vector-icons|react-native-modal-dropdown|react-native-country-codes-picker|@react-native-async-storage|react-native-image-picker|react-i18next|i18next|react-native-drawer-layout|react-native-popover-view|@rnmapbox\/maps|react-native-modal-datetime-picker|@react-native-community\/datetimepicker|@react-native-documents\/picker)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous', // ✅ Let Babel decide ESM vs CJS
            presets: [
              'module:metro-react-native-babel-preset',
              '@babel/preset-typescript',
            ],
            plugins: ['react-native-reanimated/plugin'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
  ],
  devServer: {
    static: [
      { directory: path.resolve(__dirname, 'dist') },
      { directory: path.resolve(__dirname, 'web') },
    ],
    historyApiFallback: true,
    port: 3030,
    open: true,
  },
  experiments: {
    outputModule: false,
  },
};
