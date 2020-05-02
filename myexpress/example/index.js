// const express = require('express');
const express = require('../index.js');
var router = express.Router();

var app = express();

// app.use('/user', function (req, res, next) {
//   console.log(req.url);
//   console.log(req.baseUrl);
//   console.log('app Time：', Date.now());
//   next();
// });
// app.get('/user', (req, res, next) => {
//   console.log(req.url);
//   console.log(req.baseUrl);
//   res.send('app hello');
//   next();
// });
// app.use('/user', (req, res, next) => {
//   console.log(req.url);
//   console.log(req.baseUrl);
//   console.log('app end Time：', Date.now());
// });

router.use((req, res, next) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log('app Time：', Date.now());
  next();
});
router.get('/', (req, res, next) => {
  console.log(req.url);
  console.log(req.baseUrl);
  res.send('router hello');
  next();
});
router.use((req, res, next) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log('app end Time：', Date.now());
});
// NOTE 需要slashAdded处理这种情况
app.use('/user', router);
app.listen(3001, () => {
  console.log('server is listening http://localhost:3001');
});
