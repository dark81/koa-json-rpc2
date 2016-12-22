var koa = require('koa');
var app = module.exports = koa();

var koaJsonRpc2 = require('../index');

var jrpc2 = koaJsonRpc2();

jrpc2.use('user', function* user() {
  return 'root';
});

app.use(jrpc2.app());

// app.listen(3000);
