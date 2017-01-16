/* eslint-env mocha */
/* eslint func-names: "off" */

var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('./test_server');

var request = supertest.agent(app.listen());

var parseError = {
  jsonrpc: '2.0',
  error: {
    code: -32700,
    message: 'Parse error',
  },
  id: null,
};

var invalidJson = {
  firstName: 'John',
  lastName: 'Dow',
};

var invalidRequestError = {
  jsonrpc: '2.0',
  error: {
    code: -32600,
    message: 'Invalid Request',
  },
  id: null,
};

var invalidJsonId = {
  firstName: 'John',
  lastName: 'Dow',
  id: 8,
};

var invalidRequestErrorId = {
  jsonrpc: '2.0',
  error: {
    code: -32600,
    message: 'Invalid Request',
  },
  id: 8,
};

var otherQuery = {
  jsonrpc: '2.0',
  method: 'other',
  id: 1,
};

var methodNotFoundError = {
  jsonrpc: '2.0',
  error: {
    code: -32601,
    message: 'Method not found',
  },
  id: 1,
};

var userQuery = {
  jsonrpc: '2.0',
  method: 'user',
  id: 2,
};

var userResponce = {
  jsonrpc: '2.0',
  result: 'root',
  id: 2,
};

var sumQuery = {
  jsonrpc: '2.0',
  method: 'sum',
  params: [1, 2, 3],
  id: 3,
};

var sumResponce = {
  jsonrpc: '2.0',
  result: 6,
  id: 3,
};

var ctxQuery = {
  jsonrpc: '2.0',
  method: 'ctx',
  id: 12,
};

var ctxResponce = {
  jsonrpc: '2.0',
  result: 'context string',
  id: 12,
};

var internalQuery = {
  jsonrpc: '2.0',
  method: 'internal',
  id: 18,
};

var internalResponce = {
  jsonrpc: '2.0',
  error: {
    code: -32603,
    message: 'Internal error',
  },
  id: 18,
};

describe('koa-json-rpc2', function () {
  it('return parse error on non-json call', function (done) {
    request.post('/')
      .send('Malformed string')
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(parseError);
        done();
      });
  });
  it('return invalid request error with null id on not valid request', function (done) {
    request.post('/')
      .send(invalidJson)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(invalidRequestError);
        done();
      });
  });
  it('return invalid request error with non-null id on not valid request', function (done) {
    request.post('/')
      .send(invalidJsonId)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(invalidRequestErrorId);
        done();
      });
  });
  it('return method not found error on unknown method request', function (done) {
    request.post('/')
      .send(otherQuery)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(methodNotFoundError);
        done();
      });
  });
  it('return result for call without arguments', function (done) {
    request.post('/')
      .send(userQuery)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(userResponce);
        done();
      });
  });
  it('return result for call without arguments', function (done) {
    request.post('/')
      .send(sumQuery)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(sumResponce);
        done();
      });
  });
  it('have access to koa context passed to rpc method', function (done) {
    request.post('/')
      .send(ctxQuery)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(ctxResponce);
        done();
      });
  });
  it('have return internal error as result of throw inside RPC method', function (done) {
    request.post('/')
      .send(internalQuery)
      .end(function (err, res) {
        expect(JSON.parse(res.text)).to.be.deep.equal(internalResponce);
        done();
      });
  });
});
