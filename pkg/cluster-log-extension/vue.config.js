const path = require('path');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  chainWebpack(config) {
    config.resolve.alias
      .set('@shell', path.resolve(__dirname, '../../node_modules/@rancher/shell'))
      .set('~@shell', path.resolve(__dirname, '../../node_modules/@rancher/shell'));
  }
});
