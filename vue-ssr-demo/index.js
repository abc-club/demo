// import createApp from './src/entry-server';

const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8'),
});
const createApp = require('./src/entry-server');

server.get('/', (req, res) => {
  const context = { url: req.url };
  createApp(context).then(app => {
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found');
        } else {
          res.status(500).end('Internal Server Error');
        }
        return;
      }
      res.end(html);
    });
  });
});

server.listen(8080, () => {
  console.log('listening: http://localhost:8080');
});
