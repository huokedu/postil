
var view = require('co-views');
var users = require('../ORM/users');
var render = view(__dirname + '/../web/tpls/', {map: {html: 'ejs'}});

//var Router = require('koa-router');
//var indexR = new Router();

function *index(next) {
    var datas = yield users.find({});
    if(this.method == 'GET' && this.get('X-Requested-With') != 'XMLHttpRequest') {
        this.body = yield render('index', {text: 'Hello World！' + datas[0].name});
        this.status = 200;
    }
};

//indexR.get('/index', index);

module.exports = index;

