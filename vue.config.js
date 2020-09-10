module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        // 代理到https协议下
        secure: true
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios'
    }
  }
}
