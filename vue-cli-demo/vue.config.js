const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
    config.plugin('PrerenderSPAPlugin').use(PrerenderSPAPlugin, [
      {
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/vuex'],

        renderer: new Renderer({
          inject: {
            foo: 'bar',
          },
          headless: true,
          renderAfterDocumentEvent: 'render-event',
        }),
      },
    ]);
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/variables.scss";`,
      },
    },
  },
};
