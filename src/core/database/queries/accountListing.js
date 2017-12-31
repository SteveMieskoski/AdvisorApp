let database = require('../connection');
const _ = require('lodash');
const defaultValues = require('./defaultIndustryAndSectorMappings');
const semiStatic = require('../../static/index');
const opinionProcessor = require('./opinionProcessor');
const configValues = require('../../configuration/index');

module.exports = getAccountListing;


function getAccountListing() {
	return new Promise((resolve, reject) => {

		database.accounts.findAll({attributes: ['identifier', 'uid']})
			.then((rawResults) => {
				let unique = new Set();
				let results = [];
				for (let i = 0; i < rawResults.length; i++) {
					if(rawResults[i].dataValues.identifier){
						unique.add({identifier: rawResults[i].dataValues.identifier});
						//results.push(rawResults[i].dataValues);
					}
				}
				for (let item of unique.values()) {
					results.push(item);
				}
				resolve([...unique]);
				//resolve(results);
			})
	})
}