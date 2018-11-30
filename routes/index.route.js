const express= require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const config = require('../config/config');

const enquiryRoutes= require('./enquiry.route');
const genRoute = require('../routes/generic.route');
const authRoutes = require('../routes/auth.route');


/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount enqury routes at /enquiry
router.use('/v1/enquiry', enquiryRoutes);
router.use('/v1/auth', authRoutes);

router.use(genRoute.router);


module.exports = router;