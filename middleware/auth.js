function *auth(next) {

    try {
        yield next;
    }catch(e) {
        if(401 == e.status) {
            this.status = 401;
            this.body = 'cant haz that';
        } else {
            throw e;
        }
    }
};

module.exports = auth;

