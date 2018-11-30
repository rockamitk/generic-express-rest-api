const express = require('express');
const  validate= require('express-validation');
const  validateParam= require('../config/validate.param');
const enquiryCtrl= require('../controllers/enquiry.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/enquiry - Get list of enquiry */
  .get(enquiryCtrl.list)

  /** POST /api/enquiry - Create new enquiry */
  .post(validate(validateParam.createEnquiry), enquiryCtrl.create);

router.route('/:_id')
  /** GET /api/enquiry/:enquiryId - Get enquiry */
  .get(enquiryCtrl.get)

  /** PUT /api/enquiry/:enquiryId - Update enquiry */
  .put(validate(validateParam.updateEnquiry), enquiryCtrl.update)

  /** DELETE /api/enquiry/:enquiryId - Delete enquiry */
  .delete(enquiryCtrl.remove);

/** Load enquiry when API with enquiryId route parameter is hit */
router.param('_id', enquiryCtrl.load);

module.exports = router;