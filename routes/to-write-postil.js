var Router = require('koa-router');
var toWritePostil = new Router();

toWritePostil.post('/toPost', function *(next) {
    this.body = 'wrong';
}).get('/toGet', function *(next) {
    this.body = 'good';
});

module.exports = toWritePostil;