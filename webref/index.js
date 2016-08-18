var koa = require('koa');
var app = koa();

var kmongo = require('koa-mongo');
var hbs = require('koa-hbs');
var router = require('koa-router')();
var send = require('koa-send');
var XMLHttpRequest = require('xhr2');

app.use(kmongo({
  host: 'localhost',
  port: 27017,
  db:   'myref'
}));

app.use(hbs.middleware({
  viewPath: __dirname + '/templates'
}));

router.get('/statics/:spath', function *(){
  yield send(this, this.params.spath, {
    root: __dirname + '/statics'
  });
})
.get('/bower/:package/:path', function *(){
  yield send(this, this.params.package + '/dist/' + this.params.path, {
    root: __dirname + '/bower_components'
  });
})
.get('/', function *(){
  this.body = 'Hello, word at /';
})
.get('/test', function *(){
  this.body = [{name: '123'}, {name: '456'}];
})
.get('/import/doi/:doistr', function *(next){
  var xhrreq = new XMLHttpRequest();
})
.get('/newref', function *(next){
  this.ref_data = {};
  this.view_name = 'refedit';
  yield next;
})
.get('/refs/', function *(next){
  this.ref_data = yield this.mongo.db('myref').collection('bibdb')
                   .find().toArray();
  this.view_name = 'reflist';
  yield next;
})
.get('/refs/:citekey', function *(next){
  this.ref_data = yield this.mongo.db('myref').collection('bibdb')
                  .find({citekey: this.params.citekey}).toArray();
  this.view_name = 'ref';
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
      refs: this.ref_data
    });
    break;
  default:
    yield next;
    break;
  }
});

app.listen(8080);
