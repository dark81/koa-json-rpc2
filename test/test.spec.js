/* eslint-env mocha */

var expect = require('chai').expect;
var supertest = require('supertest');
var app = require("./test_server");

var request = supertest.agent(app.listen());

var parseError = {
  jsonrpc: '2.0',
  error: {
    code: -32700,
    message: 'Parse error'
  },
  id: null
};

var invalidJson = {
  firstName: 'John',
  lastName: 'Dow'
};

var invalidRequestError = {
  jsonrpc: '2.0',
  error: {
    code: -32600,
    message: 'Invalid Request'
  },
  id: null
};

var invalidJsonId = {
  firstName: 'John',
  lastName: 'Dow',
  id: 8
};

var invalidRequestErrorId = {
  jsonrpc: '2.0',
  error: {
    code: -32600,
    message: 'Invalid Request'
  },
  id: 8
};

var otherQuery = {
  jsonrpc: '2.0',
  method: 'other',
  id: 1
};

var methodNotFoundError = {
  jsonrpc: '2.0',
  error: {
    code: -32601,
    message: 'Method not found'
  },
  id: 1
};

var userQuery = {
  jsonrpc: '2.0',
  method: 'user',
  id: 2
};

var userResponce = {
  jsonrpc: '2.0',
  result: 'root',
  id: 2
};

var sumQuery = {
  jsonrpc: '2.0',
  method: 'sum',
  params: [1, 2, 3],
  id: 3
};

var sumResponce = {
  jsonrpc: '2.0',
  result: 6,
  id: 3
};

describe('koa-json-rpc2', function () {
  it('return parse error on non-json call', function (done) {
    request.post('/')
      .send('Malformed string')
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(parseError);
        done();
      });
  });
  it('return invalid request error with null id on not valid request', function (done) {
    request.post('/')
      .send(invalidJson)
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(invalidRequestError);
        done();
      });
  });
  it('return invalid request error with non-null id on not valid request', function (done) {
    request.post('/')
      .send(invalidJsonId)
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(invalidRequestErrorId);
        done();
      });
  });
  it('return method not found error on unknown method request', function (done) {
    request.post('/')
      .send(otherQuery)
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(methodNotFoundError);
        done();
      });
  });
  it('return result for call without arguments', function (done) {
    request.post('/')
      .send(userQuery)
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(userResponce);
        done();
      });
  });
  it('return result for call without arguments', function (done) {
    request.post('/')
      .send(sumQuery)
      .end(function(err, res){
        expect(JSON.parse(res.text)).to.be.deep.equal(sumResponce);
        done();
      });
  });
});