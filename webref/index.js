var koa = require('koa');
var app = koa();

var kmongo = require('koa-mongo');
var router = require('koa-router')();

app.use(kmongo({
  host: 'localhost',
  port: 27017,
  db:   'myref'
}));

router.get('/', function *(){
  this.body = 'Hello, word at /';
})
.get('/test', function *(){
  this.body = [{name: '123'}, {name: '456'}];
})
.get('/refs/', function *(next){
  /*this.body = "hello, world";
  this.mongo.db('myref').collection('bibdb')
  .find().toArray(function(err, items){
    this.body = items;
  });*/
  this.body = yield this.mongo.db('myref').collection('bibdb')
              .find().toArray();
  this.view_name = 'refs';
  yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
