var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/postil');
var extended = require('extend');
var articles = wrap(db.get('articles'));
var cryptojs = require('cryptojs').Crypto;

var Article = {
    genArticle: function (attrs) {
        var article = {
            title: '',
            body: '',
            time: 0,
            author: '',
            source: '',
            aid: cryptojs.SHA1((attrs.body || '') + Date.now()),
            postils: []
        };
        return extended(article, attrs || {});
    },
    genPostil: function (attrs) {
        var postil = {
            uid: '',
            pid: cryptojs.SHA1((attrs.text || '') + Date.now()),
            text: '',
            sIndex: 0,
            eIndex: 0
        }
        return extended(postil, attrs);
    },
    dbs: articles
};

module.exports = Article;

//var postil = {
//    uid: '',
//    pid: '',
//    text: '',
//    sIndex: 0,
//    eIndex: 0
//}
//var article = {
//    title: '',
//    body: '',
//    time: 0,
//    author: '',
//    source: '',
//    aid: '',
//    postils: []
//};



