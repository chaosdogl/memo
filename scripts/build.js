process.env.NODE_ENV = 'production';

const { scriptVersion } = require('./utils/paths');
const overrides = require('./config-overrides');

const webpackConfigPath = `${scriptVersion}/config/webpack.config`;
const webpackConfig = require(webpackConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = (env) => overrides.webpack(webpackConfig(env), env);

const pathsConfigPath = `${scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports =
  overrides.paths(pathsConfig, process.env.NODE_ENV);

// run original script
require(`${scriptVersion}/scripts/build`);
