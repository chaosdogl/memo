const paths = require('./utils/paths');
// load environment variables from .env files
// before overrides scripts are read
require(paths.scriptVersion + '/config/env');

const memeoveride = require('../../memo-overrides');
let override = {}
try {
  override = require(paths.configOverrides);
} catch (error) {
  console.log('without config-overrides.js')
}

const webpack = typeof override === 'function' ?
  ((config, env) => {
    return override(memeoveride(config, env), env)
  }) : ((config, env) => memeoveride(config, env))

if (override.devserver) {
  console.log(
    'Warning: `devserver` has been deprecated. Please use `devServer` instead as ' +
    '`devserver` will not be used in the next major release.'
  )
}

const devServer = override.devServer || override.devserver
  || ((configFunction) =>
    (proxy, allowedHost) =>
      configFunction(proxy, allowedHost));

const jest = override.jest || ((config) => config);

const pathsOverride = override.paths || ((paths, env) => paths);

// normalized overrides functions
module.exports = {
  webpack,
  devServer,
  jest,
  paths: pathsOverride
};
