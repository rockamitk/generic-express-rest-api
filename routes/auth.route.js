const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const validateParam = require('../config/validate.param');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();

/** POST /api/v1/auth/token - Returns token if correct username and password is provided */
router.route('/token')
  .post(validate(validateParam.genToken), authCtrl.generateToken);

/** POST /api/v1/auth/login - Returns token if correct username and password is provided */
router.route('/login')
.post(validate(validateParam.login), authCtrl.login);


/** GET /api/v1/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

module.exports = router;
