# koa-json-rpc2
Yet another JSON-RPC2 middleware implementation for koa-js.

## Installation
```bash
npm install koa-json-rpc2
```

## Usage
```js
var koa = require('koa');
var app = koa();

var koaJsonRpc2 = require('koa-json-rpc2');

var jrpc2 = koaJsonRpc2();

jrpc2.use('user', function* user() {
  return 'root'
});

jrpc2.use('sum', function* sum(params) {
  return params.reduce(
    function (prev, curr) {
      return prev+curr;
    },
    0);
});

app.use(jrpc2.app());

app.listen(3000);

```

## Authors
Dmytro Ryzhykov <dark81@gmail.com>

## License
The MIT License
