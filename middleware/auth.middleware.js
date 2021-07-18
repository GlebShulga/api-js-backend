/* eslint-disable consistent-return */
const httpContext = require('express-http-context');

const jwt = require('jsonwebtoken');
const logger = require('../services/logger')(module);
const config = require('../config/auth.config');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({
        message: 'No token provided!',
      });
    }
    const decoded = jwt.verify(token, config.secret);

    req.user = decoded.user;
    httpContext.set('user', decoded?.user);
    next();
  } catch (error) {
    logger.error('Not authorized');
    return res.status(401).end();
  }
};
