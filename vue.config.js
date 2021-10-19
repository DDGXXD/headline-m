// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': '#30aff9',
          // 'nav-bar-icon-color': '#ccc',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true;
          @import "${__dirname}/src/styles/theme.less";
          @import "${__dirname}/node_modules/vant/lib/style/var.less";
          `
        }
        // }
      }
    }
  },
  // 跨域处理
  devServer: {
    // port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://toutiao.itheima.net', // API服务器的地址
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
          '^/api': ''
        }
      }
    }
  }

}
