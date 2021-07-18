const { Router } = require('express');
// const jwt = require('jsonwebtoken');
// const config = require('../config/auth.config');
// const logger = require('../services/logger')(module);
const controller = require('../controllers/auth.controller');
const { verifySignUp } = require('../middleware');

const router = Router();

router.post(
  '/signup',
  [
    verifySignUp,
  ],
  controller.signup,
);

router.post('/signin', controller.signin);

module.exports = router;
