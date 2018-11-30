const mongoose= require('mongoose');
let fieldsAlias = require('mongoose-aliasfield');

const httpStatus= require('http-status');
const APIError= require('../helpers/APIError');
const schemaConfig = require('../config/generic.schema');

	console.log("-----------------------------------");
	let collections = schemaConfig.collections;
	for(let i in collections){
		let schema;
		let collection = collections[i];
		console.log("\nSchema name: "+collection.name);

		let fields = {};
		for(let j in collection.attributes.name){
			fields[collection.attributes.name[j]] = collection.attributes.properties[j];
		}
		console.log("Schema prototype: "+JSON.stringify(fields));

		//Schema Register
		schema = new mongoose.Schema(fields, {timestamps: true});
		schema.method({});
		schema.statics = {
			get(id) {
				console.log("\nStatic get @ "+id);
				return this.findById(id)
					.then((data) => {					
					    if (data) {
					      return data;
					    }
					    const err = new APIError('No such data exists!', httpStatus.NOT_FOUND);
					    return Promise.reject(err);
					});
			},
			list(query) {
				console.log(`query: `+ JSON.stringify(query));
				return this.find(query)
				  .sort({ createdAt: -1 });
			}
		};
		schema.plugin(fieldsAlias);

		module.exports[collection.name] = mongoose.model(collection.name, schema);
	}
	console.log("\n-----------------------------------");
	console.log("Generic models built . . .");
