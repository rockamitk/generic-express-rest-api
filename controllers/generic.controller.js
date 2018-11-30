//Models
const httpStatus= require('http-status');
const APIError= require('../helpers/APIError');

const schemaConfig = require('../config/generic.schema');
const genericModel = require('../models/generic.model');

	console.log("-----------------------------------");

	let collections = schemaConfig.collections;

	for(let i in collections){
		let collection = collections[i];

		//model
		let model = genericModel[collection.name];

		//Controller
		model.getList = function (req, res, next) {
		  model.list(req.query)
		    .then(datas => {
		     	datas = datas.map(function(p){
		     		return p.toAliasedFieldsObject();
				});
				return res.json(datas);
		    })
		    .catch(e => next(e));
		};

		model.insert = function(req, res, next){
	        let obj = new model({});
		  	Object.keys(req.body).map(function(key, value) {
		   		obj[key] = req.body[key];
			});
			console.log("Create data @ "+obj);
			obj.save()
				.then(savedData => {
					return res.json(savedData.toAliasedFieldsObject());
				})
				.catch(e => next(e));
	    };
		model.update = function(req, res, next){
			let id = req.params.id;
			model.get(id)
				.then((data) => {
					console.log(`Fetched data`+JSON.stringify(data));
				  	Object.keys(req.body).map(function(key, value) {
				  		if(data[key]){
					   		data[key] = req.body[key];
				  		}else{
				  			console.log(`\t${key} does not exists to the schema`);
				  		}
					});
					data.save()
						.then(updatedData => {
							console.log("Update data @ success");
							return res.json(updatedData.toAliasedFieldsObject());
						})
						.catch(e => next(e));
				})
				.catch(e => {
					console.log("Error @update: "+ id);
					next(e);
				});
	    };

		model.getById = function(req, res, next) {
			let id = req.params.id;
			model.get(id)
				.then((data) => {
					console.log("Success @:getById: "+ id);
					return res.json(data.toAliasedFieldsObject());
				})
				.catch(e => {
					console.log("Error @get: "+ id);
					next(e);
				});
	    };

	    model.delete = function(req, res, next) {
			let id = req.params.id;
			model.get(id)
				.then((data) => {
					console.log(`Fetched data ${data}`);
					data.remove()
						.then(data => {
							console.log("Delete data @ success");
							return res.json(data.toAliasedFieldsObject());
						})
						.catch(e => next(e));
				})
				.catch(e => {
					console.log("Error @ delete"+ id);
					next(e);
				});
		};
		module.exports[collection.name] = model;
	}
	console.log("Genirc controllers built . . .");
	console.log("-----------------------------------\n");
