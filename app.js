
var koa = require('koa');
var static = require('koa-static');
var mount = require('koa-mount');
var index = require('./routes/index');
var toWritePostil = require('./routes/to-write-postil');
var tpls = require('./routes/tpls');
var app = koa();

app.name = 'postil';
app.env = 'development';

app.use(static('./web/static'));



//get or post request should be above
app.use(mount(toWritePostil.middleware()));
app.use(mount(tpls.middleware()));
//get or post request should be below

app.use(index);

//error handle
app.on('error', function (err, ctx, ctx) {
    console.error('server error', err, ctx);
});

app.listen(3000);

module.exports = app;