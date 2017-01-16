/* eslint import/no-extraneous-dependencies: "off" */

var koa = require('koa');

var app = module.exports = koa();

var koaJsonRpc2 = require('../index');

var jrpc2 = koaJsonRpc2();

jrpc2.use('user', function* user() {
  return 'root';
});

jrpc2.use('sum', function* sum(params) {
  return params.reduce(function (prev, curr) { // eslint-disable-line
    return prev + curr;
  },
    0);
});

jrpc2.use('internal', function* internal() {
  throw new Error();
});

app.context.some_string = 'context string';

jrpc2.use('ctx', function* ctx() {
  return this.app.context.some_string;
});

jrpc2.use('checkParams', function* checkParams(params) {
  if (params && Object.prototype.hasOwnProperty.call(params, 'foo')) {
    return params.foo;
  }
  throw new koaJsonRpc2.InvalidParamsError('Param foo omitted');
});

app.use(jrpc2.app());

// app.listen(3000);
