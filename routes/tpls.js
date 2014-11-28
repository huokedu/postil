var Router = require('koa-router');
var fs = require('co-fs');
var tpls = new Router();

tpls.get('/tpls/:name', function *(next) {
    var tpl = yield fs.readFile(__dirname + '/../web/tpls/' + this.params.name + '.html', 'utf-8');
    this.body = tpl;
});

module.exports = tpls;
