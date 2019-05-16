process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { scriptVersion } = require('./utils/paths');
const overrides = require('./config-overrides');

const webpackConfigPath = `${scriptVersion}/config/webpack.config`;
const devServerConfigPath = `${scriptVersion}/config/webpackDevServer.config.js`;
const webpackConfig = require(webpackConfigPath);
const devServerConfig = require(devServerConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = (env) => overrides.webpack(webpackConfig(env), env);

require.cache[require.resolve(devServerConfigPath)].exports =
  overrides.devServer(devServerConfig, process.env.NODE_ENV);

const pathsConfigPath = `${scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports =
  overrides.paths(pathsConfig, process.env.NODE_ENV);

// run original script
require(`${scriptVersion}/scripts/start`);
