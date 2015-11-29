var koa = require('koa');
var app = koa();

var kmongo = require('koa-mongo');
var hbs = require('koa-hbs');
var router = require('koa-router')();

app.use(kmongo({
  host: 'localhost',
  port: 27017,
  db:   'myref'
}));

app.use(hbs.middleware({
  viewPath: __dirname + '/templates'
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
  this.ref_data = yield this.mongo.db('myref').collection('bibdb')
                   .find().toArray();
  this.view_name = 'reflist';
  yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(function *(next){
  //console.log(this.request.type);
  switch (this.request.accepts('html', 'json')) {
  case 'json':
    this.body = this.ref_data;
    yield next;
    break;
  case 'html':
    yield this.render(this.view_name, {
      testmsg: 'hello, world!',
      refs: this.ref_data
    });
    break;
  default:
    yield next;
    break;
  }
});

app.listen(8080);
