var app = require('./app.js');
var should = require('should');
var co = require('co');
var request = require('supertest').agent(app.listen());

describe('200', function(){
    describe('when GET /', function(){
        it('should return the index page', function(done){
            request
                .get('/')
                .expect()
                .expect(/Page Not Found/, done);
        });
    });
});
