const config = require('config');
const jwt = require('jsonwebtoken')

module.exports = function Token_generator(id) {
    const payload = {
      user: {
        id: id,
      },
    };
  
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        config.get("jwtFrutSecret"),
        { expiresIn: "5y" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }