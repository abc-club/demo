module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/variables.scss";`,
      },
    },
  },
};
