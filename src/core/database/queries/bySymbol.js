let database = require('../connection');
const _ = require('lodash');
const defaultValues = require('./defaultIndustryAndSectorMappings');
const semiStatic = require('../../static/index');
const opinionProcessor = require('./opinionProcessor');
const configValues = require('../../configuration/index');

module.exports = bySymbol;


function bySymbol(symbol) {
	return new Promise((resolve, reject) => {
				database.stocks.findAll({where: { symbol: symbol}})
					.then((rawResults) => {
						let results = [];
						for (let i = 0; i < rawResults.length; i++) {
							rawResults[i].dataValues["TechAttribScore"] = rawResults[i].dataValues["TechAttribScore"].toString() + rawResults[i].dataValues["TechAttribScoreDirection"];
							_.unset(rawResults[i], rawResults[i].dataValues["TechAttribScoreDirection"]);
							results.push(rawResults[i].dataValues);
						}
						resolve(postProcessResults(results));

					})
	})
}

function postProcessResults(results) {
	return new Promise((resolve, reject) => {
		let processed = [];
		for (let i = 0; i < results.length; i++) {
			let opinionThresholds = configValues.opinionThresholds.store || defaultValues.thresholdValues;
			let semiStaticValues = semiStatic || defaultValues;
			let postProcessor = new opinionProcessor(semiStaticValues, opinionThresholds);
			processed.push(postProcessor.processQueryResult(results[i]))
		}
		Promise.all(processed)
			.then((response) => {
				resolve(response);
			});
	})
}
