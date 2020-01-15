'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"/api"',
  IMG_URL: '"http://dongsheng-test.oss-cn-hangzhou.aliyuncs.com/"'
})