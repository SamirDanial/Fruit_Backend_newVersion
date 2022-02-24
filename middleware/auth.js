const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if there is not any token
    if(!token) {
        req.isAuth = false;
        return next()
    }

    // Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtFrutSecret'));

        req.user = decoded.user;
        req.isAuth = true;
        return next();
    } catch(err){
        req.isAuth = false;
        return next();
    }
}