//404 handling
function *pageNotFound(next) {
    yield next;
    if(404 != this.status) return;

    this.status = 404;

    switch(this.accepts('html', 'json')) {
        case 'html': {
            this.type = 'html';
            this.body = '<p>Page not found</p>'
        }; break;
        case 'json': {
            this.body = {
                message: 'Page not found'
            };
        }; break;
        default: {
            this.type = 'text';
            this.body = 'Page not found';
        };
    }
};
module.exports = pageNotFound;
