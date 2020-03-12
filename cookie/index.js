var express = require('express')
// var cookieParser = require('cookie-parser')
var session = require('express-session')

var app = express()
// app.use(cookieParser())
app.use(session({
  secret: '12345',
  name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true
}))


app.get('/cookie', (req, res) => {
  res.cookie('test', 'ttt')
  res.send('1')
})

app.get('/2', (req, res) => {
  res.send('2')
})

app.get("/login/:name",function(req,res,next){
  var name = req.param('name');
  if(!name){
      next();
      return;
  }
  req.session.login='1';
  req.session.username= name;
  res.send("logined");
})
app.get('/',function(req,res){
  res.send(req.session.username);
})

app.listen(1201, '127.0.0.1',()=> {
  console.log('http://127.0.0.1:1201')
})