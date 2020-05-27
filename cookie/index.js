var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.use(cookieParser());
app.use(
  session({
    secret: '12345',
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 80000 }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
  }),
);

// 仿session
function MySession() {
  // 这里不会重复执行
  console.log('Time111: %d', Date.now())
  let store = {}
  return (req,res,next)=>{
    console.log('Time222: %d', Date.now())
    if(req.store) {
      next()
      return
    }
    req.store = store
    if(req.store.a) {
      req.store.a++
      next()
    } else {
      req.store.a = 1
      next()
    }
  }
}

app.use(MySession())


app.get('/MySession', (req, res) => {
  res.send(req.store.a.toString());
});

app.get('/cookie', (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.cookie('test', 'ttt', { expires: new Date(Date.now() + 900000), httpOnly: true });
  res.cookie('test2', 'ttt', { maxAge: 900000 });
  res.send('1');
});

app.get('/2', (req, res) => {
  res.send('2');
});

app.get('/login/:name', function (req, res, next) {
  var name = req.param('name');
  if (!name) {
    next();
    return;
  }
  req.session.login = '1';
  req.session.username = name;
  
  res.send('logined');
});
app.get('/', function (req, res) {
  if (!req.session.username) res.redirect('/login/abc');
  res.send(req.session.username);
});

app.listen(1201, '127.0.0.1', () => {
  console.log('http://127.0.0.1:1201');
});
