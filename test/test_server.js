var koa = require('koa');
var app = module.exports = koa();

var koaJsonRpc2 = require('../index');

var jrpc2 = koaJsonRpc2();

jrpc2.use('user', function* user() {
  return 'root';
});

jrpc2.use('sum', function* sum(params) {
  return params.reduce(function (prev, curr) {
    return prev+curr;
  },
    0);
});

app.use(jrpc2.app());

// app.listen(3000);
