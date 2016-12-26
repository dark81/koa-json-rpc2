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

// Create rpc router instance
var jrpc2 = koaJsonRpc2();

// Register new rpc function
jrpc2.use('user', function* user() {
  return 'root'
});

// Register new rpc function
jrpc2.use('sum', function* sum(params) {
  return params.reduce(
    function (prev, curr) {
      return prev + curr;
    },
    0);
});

// Register rpc router as koa middleware
app.use(jrpc2.app());

app.listen(3000);

```

## Debug
Set variable DEBUG to koa-json-rpc2 to enable debug output.
For instance:
```bash
DEBUG=koa-json-rpc2 npm server.js
```

## Authors
Dmytro Ryzhykov <dark81@gmail.com>

## License
The MIT License
