const Joi= require('joi');

module.exports ={
  // POST /api/enquiry
  createEnquiry: {
    body: {
      name : Joi.string().regex(/^([a-zA-Z0-9]){3,30}$/).options({ language: { string: { regex: { base: "should be valid name with minmum 3 and maximum 30 characters" } } } }).trim().required(),
      email : Joi.string().email().lowercase().required(),
      message : Joi.string().regex(/^([a-zA-Z0-9()@ ,.'-]){3,1000}$/).options({ language: { string: { regex: { base: `should be valid name with minmum 3 and maximum 1000 characters` } } } }).required()
    }
  },

  // UPDATE /api/enquiry/:enquiryId
  updateEnquiry: {
    body: {
      name : Joi.string().regex(/^([a-zA-Z0-9 .-]){3,30}$/).options({ language: { string: { regex: { base: "should be valid name with minmum 3 and maximum 30 characters" } } } }).trim().required(),
      email : Joi.string().email().lowercase().required(),
      message : Joi.string().regex(/^([a-zA-Z0-9()@ ,.'-]){3,1000}$/).options({ language: { string: { regex: { base: `should be valid name with minmum 3 and maximum 1000 characters` } } } }).required()
    },
    params: {
      _id: Joi.string().hex().required()
    }
  },

  user: {
    body: {
      user_name : Joi.string().regex(/^([a-zA-Z0-9 .-]){3,30}$/).options({ language: { string: { regex: { base: "should be valid name with minmum 3 and maximum 30 characters" } } } }).trim().required(),
      user_email : Joi.string().email().lowercase().required(),
      user_password : Joi.string().required()
    }
  },
  enquiry: {
    body: {
      enquiry_name : Joi.string().regex(/^([a-zA-Z0-9 .-]){3,30}$/).options({ language: { string: { regex: { base: "should be valid name with minmum 3 and maximum 30 characters" } } } }).trim().required(),
      enquiry_email : Joi.string().email().lowercase().required(),
      enquiry_message : Joi.string().required()
    }
  },
  test: {
    body: {
      test_name : Joi.string().regex(/^([a-zA-Z0-9 .-]){3,30}$/).options({ language: { string: { regex: { base: "should be valid name with minmum 3 and maximum 30 characters" } } } }).trim().required(),
      test_email : Joi.string().email().lowercase().required(),
      test_message : Joi.string().required()
    }
  },

  // POST /api/auth/token
  genToken: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  login: {
    body: {
      user_email: Joi.string().email().required(),
      user_password: Joi.string().required()
    }
  }
};
