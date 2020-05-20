var http = require('http');

var app = http.createServer((req, res) => {
  res.end('hello');
});

app.listen(3003);
