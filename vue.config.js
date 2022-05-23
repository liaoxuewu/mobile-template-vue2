const path = require('path')

// 防止缓存
let version = new Date().getTime()

function resolve(dir = '') {
  return path.join(__dirname, './src', dir)
}

module.exports = {
  publicPath: './', //基本路径
  outputDir: 'dist', //构建时输出目录 默认dist
  assetsDir: 'static', //放置静态资源目录
  productionSourceMap: false,

  // 防止缓存
  filenameHashing: false, // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.
  configureWebpack: {
    //重点
    output: {
      // 输出重构 打包编译后的js文件名称,添加时间戳.
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    }
  },
  css: {
    //重点.
    extract: {
      // 打包后css文件名称添加时间戳
      filename: `css/[name].${version}.css`,
      chunkFilename: `css/[name].${version}.css`
    }
  },
  lintOnSave: false,

  devServer: {
    // 配置代理
    // proxy: {
    //   '/pdf_proxy': {
    //     target: '',
    //     pathRewrite: { '^/pdf_proxy': '' },
    //     changeOrigin: true, // target是域名的话，需要这个参数
    //     secure: false // 设置支持https协议的代理
    //   }
    // },
    // overlay: {
    //   warning: false,
    //   errors: false
    // }
  }
}
