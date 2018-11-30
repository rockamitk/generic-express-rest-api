const randomString = require("randomstring");
module.exports.collections = [
	{
		name: "enquiry",
		attributes: {
			name:["name", "email", "message"],
			properties: [
				{type: String,alias:'enquiry_name', default: randomString.generate(10)},
				{type: String,alias:'enquiry_email', default: randomString.generate(5)+"@aviota.ai"},
				{type: String,alias:'enquiry_message', default: randomString.generate(10)}
			]
		},
		api:"/v2/enquirydata"
	},
	{
		name: "user",
		attributes: {
			name:["name", "email", "password"],
			properties: [
				{type: String, alias: 'user_name', default: randomString.generate(10)},
				{type: String, alias: 'user_email', default: randomString.generate(5)+"@aviota.ai"},
				{type: String, alias: 'user_password', default: randomString.generate(10)}
			]
		},
		api:"/v2/userdata"
	}
];
console.log("\n-----------------------------------");
console.log("Generic schemas exports . . .");