const express = require('express');
const router = express.Router();
const  validate= require('express-validation');
const  validateParam= require('../config/validate.param');

//Trigger on success mongodb connection
function init(){

	//initialize as sync.
	const schemaConfig = require('../config/generic.schema');
	const genericModel = require('../models/generic.model');
	const genericCtrl = require('../controllers/generic.controller');

	let collections = schemaConfig.collections;
	for(let i in collections){
		let collection = collections[i];
		let model = genericCtrl[collection.name];

		console.log(`Generic api url: /api${collection.api} \t [GET, POST, PUT, DELETE]`);
		//routes
		router.route(collection.api)
		  .get(model.getList)
		  .post(validate(validateParam[collection.name]), model.insert);		

		router.route(collection.api+'/:id')
		  .get(model.getById)
		  .put(validate(validateParam[collection.name]), model.update)
		  .delete(model.delete);
	}
	console.log("\nGeneric routes built . . .");
	console.log("-----------------------------------");
}

module.exports.router = router;
module.exports.init = init;