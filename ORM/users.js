var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/postil');
var users = wrap(db.get('users'));

module.exports = users;
