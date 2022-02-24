const User = require('../../../models/User');

module.exports = async function(req) {
    let isAuthorized = true;
    const user = await User.findById(req.user.id).populate("userRole");
    return new Promise((resolve, reject) => {
        try {
            if (!req.isAuth) {
                isAuthorized = false;
              }
    
              if (isAuthorized) {
                  resolve(isAuthorized)
              } else {
                  reject (isAuthorized)
              }

        } catch (error) {
            isAuthorized = false;
            reject(isAuthorized);
        }
    })
}