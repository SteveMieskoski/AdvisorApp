let database = require('../connection');
const _ = require('lodash');
const defaultValues = require('./defaultIndustryAndSectorMappings');
const semiStatic = require('../../static/index');
const opinionProcessor = require('./opinionProcessor');
const configValues = require('../../configuration/index');

module.exports = getPositionListing;


function getPositionListing(identifier) {
	return new Promise((resolve, reject) => {

		database.accountPositions.findAll({
				include: [{
					model: database.accounts,
					where: {identifier: identifier}
				}]
			})
			.then((rawResults) => {
			console.log(rawResults);
				/*let unique = new Set();
				let results = [];
				for (let i = 0; i < rawResults.length; i++) {
					if (rawResults[i].dataValues.identifier) {
						unique.add(rawResults[i].dataValues.identifier);
						//results.push(rawResults[i].dataValues);
					}
				}
				for (let item of unique.values()) {
					results.push(item);
				}
				resolve([...unique]);*/
				resolve(rawResults);
			})
	})
}

