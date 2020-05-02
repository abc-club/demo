const express = require('../index.js');

var app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3001, () => {
  console.log('server is listening http://localhost:3001');
});
