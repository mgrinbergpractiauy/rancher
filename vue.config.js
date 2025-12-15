const config = require('@rancher/shell/vue.config'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = config(__dirname, {
  excludes: [],
  // excludes: ['fleet', 'example']
  devServer: {
    host: '0.0.0.0', 
    port: 8006,   
    disableHostCheck: true, 
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }

});
