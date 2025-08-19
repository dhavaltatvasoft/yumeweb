// mobile/metro.config.js

const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..'); // Adjust to monorepo root

const defaultConfig = getDefaultConfig(projectRoot);

const config = {
  projectRoot,
  watchFolders: [
    workspaceRoot, // watch monorepo root
  ],
  resolver: {
    // Exclude any nested `react-native` installations in subnode_modules
    blockList: defaultConfig.resolver?.blockList || /.*\/node_modules\/.*\/node_modules\/react-native\/.*/,
  },
};

module.exports = mergeConfig(defaultConfig, config);
