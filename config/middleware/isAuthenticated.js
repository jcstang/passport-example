const debug = require('debug')('isAuthenticated');

module.exports = function(req, res, next) {
    console.log('^^^^^^^ hey yall ^^^^^^^^^^^^^^^');
    debug(req);
    if(req.user) {
        return next();
    }

    return res.redirect("/");
}