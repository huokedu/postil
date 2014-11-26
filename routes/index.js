

function *index(next) {
    yield next;
    if(this.method == 'GET') {
        this.body = 'Hello World';
        this.status = 200;
    }
};

module.exports = index;

