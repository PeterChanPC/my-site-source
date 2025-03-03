const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/My-Practice/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].base = '/My-Practice/'
      return args
    })
  }
})
