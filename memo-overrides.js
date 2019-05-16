
const path = require('path')
const memeAppPath = path.join(__dirname, './app')

module.exports = function override(config) {
  // rewrite rule include path
  config.module.rules.map(rule => {
    if (rule.include) {
      if (typeof rule.include === 'string') {
        rule.include = [rule.include, memeAppPath]
      } else if (typeof rule.include.psuh === 'function') {
        rule.include.psuh(memeAppPath)
      }
    }
    if (rule.oneOf) {
      rule.oneOf.map(rule => {
        if (rule.include) {
          if (typeof rule.include === 'string') {
            rule.include = [rule.include, memeAppPath]
          } else if (typeof rule.include.psuh === 'function') {
            rule.include.psuh(path.join(memeAppPath))
          }
        }
      })
    }
  })
  return config;
};