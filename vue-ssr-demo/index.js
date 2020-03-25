const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8'),
});

server.get('/', (req, res) => {
  var app = new Vue({
    data: {
      count: 1,
    },
    template: '<input v-model="count"/>',
  });

  const context = {
    title: 'hello',
    meta: `
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    `,
  };

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.end(html);
  });
});

server.listen(8080, () => {
  console.log('listening: http://localhost:8080');
});
