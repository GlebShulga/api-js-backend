const authJwt = require('./auth.middleware');
const verifySignUp = require('./verifySignUp');

module.exports = {
  authJwt,
  verifySignUp,
};
