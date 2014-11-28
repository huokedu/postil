var Router = require('koa-router');
var cheerio = require('cheerio');
var request = require('co-request');
var Article = require('../ORM/article');
var Util = require('util');
var toWritePostil = new Router();

//function Article() {
//    extended(this, {
//        author: '',
//        time: '',
//        body: '',
//        source: '36kr',
//        title: '',
//        _tags: {
//            article: false,
//            title: false,
//            body: false,
//            time: false,
//            author: false
//        }
//    });
//}
//Article.fn = Article.prototype;
//extended(Article.fn, {
//    setTag: function (tag, val) {
//        switch(tag) {
//            case 'article': {
//                this._tags[tag] = val;
//            }; break;
//            default: {
//                if(this._tags.article) {
//                    this._tags[tag] = val;
//                }
//            };
//        }
//    },
//    appendText: function (text) {
//        if(this._tags.title) {
//            this.title = text;
//        }else if(this._tags.author) {
//            this.author = text;
//        }else if(this._tags.time) {
//            this.time = text;
//        }else if(this._tags.body) {
//            this.body += text;
//        }
//    }
//});
//
//co(function *() {
//    var result = yield request('http://www.36kr.com/p/217378.html');
//    var article = new Article();
//    var count = 0;
//    var parser = new Parser.Parser({
//        onopentag: function (name, attr) {
//            count++;
//            //if(name == 'article') {
//            //    console.log('~~~~~~')
//            //}
//            if(name == 'article' && attr.class == 'single-post') {
//                article.setTag('article', true);
//            }else if(name == 'section' && attr.class == 'article') {
//                article.setTag('body', true);
//            }
//
//            switch(name) {
//                case 'h1': {
//                    article.setTag('title', true);
//                }; break;
//                case 'a': {
//                    article.setTag('author', true);
//                }; break;
//                case 'p': {
//                }; break;
//                case 'abbr': {
//                    article.setTag('time', true)
//                }; break;
//            }
//        },
//        ontext: function (text) {
//            article.appendText(text);
//            console.log(count);
//            //console.log(article)
//        },
//        onclosetag: function (name, attr) {
//            switch(name) {
//                case 'h1': {
//                    article.setTag('title', false);
//                }; break;
//                case 'a': {
//                    article.setTag('author', false);
//                }; break;
//                case 'p': {
//                    article.appendText('\n');
//                }; break;
//                case 'abbr': {
//                    article.setTag('time', false);
//                }; break;
//            }
//            if(name == 'article' && attr.class == 'single-post') {
//                article.setTag('article', false);
//            }
//            else if(name == 'section' && attr.class == 'article') {
//                article.setTag('body', false)
//            }
//        }
//    });
//    parser.write(result.body);
//    parser.end();
//
//});

/**
 * upload the document url
 */
toWritePostil.post('/article/duplicate', function *(next) {
    var url = this.request.body.source;
    var result = yield request(url);
    var $ = cheerio(result.body).find('.main article.single-post');
    var article = {};
    article.title = $.find('h1').text();
    article.author = $.find('a.uname').text();
    article.time = new Date($.find('.timeago').attr('title')).getTime();
    article.body = $.find('section.article').text().replace(/(\t)*/g, '').replace(/\n+/g, '\n');
    article.source = url;
    article = Article.genArticle(article);
    console.log(article);
    console.log(article.body);

    yield Article.dbs.insert(article);
    this.body = {
        success: true,
        aid: article.aid
    };
}).post('/article/postil', function *(next) {
    var body = this.request.body, _this = this, result = {success: false, aid: ''};
    var dbArticle = yield Article.dbs.findOne({_id: body.aid}, {postils: 1});

    if(dbArticle.postils.length != 0) {
        result.msg = '不允许修改批注';
        this.body = result;
        return;
    }

    var article = {_id: body.aid, postil:[]};
    if(body.postils) {
        body.postils.forEach(function (postil) {
            article.push(Article.genPostil(postil));
        });
    }
    yield Article.dbs.insert(article);
}).get('/article/:aid', function *() {
    var criteria = {_id: this.params.aid};
    var article = yield Article.dbs.findOne(criteria);
    this.body = {
        success: true,
        article: article
    };
});

module.exports = toWritePostil;