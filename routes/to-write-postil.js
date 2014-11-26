var Router = require('koa-router');
var toWritePostil = new Router();

toWritePostil.post('toPost', function *(next) {
    yield next;
    this.body = 'wrong';
});

module.exports = toWritePostil;