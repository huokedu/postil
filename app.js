
var koa = require('koa');
var static = require('koa-static');
var mount = require('koa-mount');
var index = require('./routes/index');
var toWritePostil = require('./routes/to-write-postil');
var app = koa();

app.name = 'postil';
app.env = 'development';


function ignoreAssets(mw) {
    return function *(next){
        if (/(\.js|\.css|\.ico|\.jpg)$/.test(this.path)) {
            yield next;
        } else {
            // must .call() to explicitly set the receiver
            // so that "this" remains the koa Context
            yield mw.call(this, next);
        }
    }
}
//secret resonse
//app.use(auth({name: 'Zero', pass: '123'}));

app.use(static('./web'));
app.use(index);
app.use(mount(toWritePostil.middleware()));


//error handle
app.on('error', function (err, ctx, ctx) {
    console.error('server error', err, ctx);
});

app.listen(3000);