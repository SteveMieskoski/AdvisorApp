let database = require('../connection');
const _ = require('lodash');
const defaultValues = require('./defaultIndustryAndSectorMappings');
const semiStatic = require('../../static/index');
const opinionProcessor = require('./opinionProcessor');
const configValues = require('../../configuration/index');

module.exports = detailedScreen;


function detailedScreen(content, display, colored) {
	return new Promise((resolve, reject) => {
		prepareWhereConditions(content)
			.then((whereCond) => {
				let query = {where: whereCond};
				if (display.length > 0) {
					query["attributes"] = display;
				}
				database.stocks.findAll(query)
					.then((rawResults) => {
						let results = [];
						for (let i = 0; i < rawResults.length; i++) {
							rawResults[i].dataValues["TechAttribScore"] = rawResults[i].dataValues["TechAttribScore"].toString() + rawResults[i].dataValues["TechAttribScoreDirection"];
							_.unset(rawResults[i], rawResults[i].dataValues["TechAttribScoreDirection"]);
							results.push(rawResults[i].dataValues);
						}
						if (colored) {
							resolve(postProcessResults(results));
						} else {
							resolve(results);
						}
					})
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

function appendQueryParam(base, content, column) {
	if (Array.isArray(content[column])) {
		let or = [];
		for (let i = 0; i < content[column].length; i++) {
			or.push({column: content[column][i]});
		}
		base[column] = {where: {$or: or}};
		return base;
	} else {
		base[column] = content[column];
		return base;
	}
}

function appendNumericQuery(base, content, column) {
	if (content[column].high && content[column].low) {
		base[column] = {$lte: content[column].high, $gte: content[column].low};
	} else if (content[column].low) {
		base[column] = {$gte: content[column].low};
	} else if (content[column].high) {
		base[column] = {$lte: content[column].high};
	}
	return base;
}

function prepareWhereConditions(content) {
	return new Promise((resolve, reject) => {
		let base = {};
		for (let prop in content) {
			switch (prop) {
				case "symbol":
					// OR conjunction only
					base = appendQueryParam(base, content, prop);
					break;
				case "company":
					// OR conjunction only
					base = appendQueryParam(base, content, prop);
					break;
				case "MarketPrice":
					base = appendNumericQuery(base, content, prop);
					break;
				case "DWASector":
					base = appendNumericQuery(base, content, prop);
					//base = base.whereNotNull("DWASector").whereIn("DWASector", content.DWASector);
					/* //base = base.whereExists(function(){
						 this.select('*').from("DWASector")
						 , content.DWASector
					 });*/
					break;
				case "Category":
					break;
				case "TechAttribScore":
					base = appendQueryParam(base, content, prop);
					break;
				case "TrendChartColumn":
					base = appendQueryParam(base, content, prop);
					break;
				case "PFTrend":
					base = appendQueryParam(base, content, prop);
					break;
				case "PFSignal":
					base = appendQueryParam(base, content, prop);
					break;
				case "RSSignal":
					base = appendQueryParam(base, content, prop);
					break;
				case "RSColumn":
					base = appendQueryParam(base, content, prop);
					break;
				case "PeerRSSignal":
					base = appendQueryParam(base, content, prop);
					break;
				case "PeerRSColumn":
					base = appendQueryParam(base, content, prop);
					break;
				case "WeeklyMomentum":
					base = appendQueryParam(base, content, prop);
					break;
				case "WeeklyDistribution":
					base = appendNumericQuery(base, content, prop);
					break;
				case "200DayMA":
					base = appendNumericQuery(base, content, prop);
					break;
				case "VertPriceObj":
					base = appendQueryParam(base, content, prop);
					break;
				case "RewardRisk":
					base = appendNumericQuery(base, content, prop);
					break;
				case "Yield":
					base = appendNumericQuery(base, content, prop);
					break;
				case "UserNote":
					break;
				case "Optionable":
					base = appendQueryParam(base, content, prop);
					break;
				case "allUS":
					base = appendQueryParam(base, content, prop);
					break;
				case "leastOneBuy":
					base = appendQueryParam(base, content, prop);
					break;
				case "MacroSector":
					base = appendQueryParam(base, content, prop);
					break;
				case "IndustrySector":
					base = appendQueryParam(base, content, prop);
					break;
				case "DividendYield":
					base = appendNumericQuery(base, content, prop);
					break;
				case "PEG":
					base = appendNumericQuery(base, content, prop);
					break;
				case "chgVsSP":
					base = appendNumericQuery(base, content, prop);
					break;
				case "CScurr":
					base = appendQueryParam(base, content, prop);
					break;
				case "Mcurr":
					base = appendQueryParam(base, content, prop);
					break;
				case "WFScurr":
					base = appendQueryParam(base, content, prop);
					break;
				case "MQcurr":
					base = appendQueryParam(base, content, prop);
					break;
				case "QC":
					base = appendQueryParam(base, content, prop);
					break;
				case "QG":
					base = appendQueryParam(base, content, prop);
					break;
				case "QV":
					base = appendQueryParam(base, content, prop);
					break;
				case 'Primary':
					break;
			}
		}
		resolve(base)
	})
}


/*
 this.screen = {
 "symbol": [],
 "company": [],
 "MarketPrice": [],
 "DWASector": [],
 "Category": [],
 "TechAttribScore": [],
 "TrendChartColumn": [],
 "PFTrend": [],
 "PFSignal": [],
 "RSSignal": [],
 "RSColumn": [],
 "PeerRSSignal": [],
 "PeerRSColumn": [],
 "WeeklyMomentum": [],
 "WeeklyDistribution": [],
 "200DayMA": [],
 "VertPriceObj": [],
 "RewardRisk": [],
 "Yield": [],
 "UserNote": [],
 "Optionable": [],
 "allUS": [],
 "leastOneBuy": [],
 "MacroSector": [],
 "IndustrySector": [],
 "DividendYield": [],
 "PEG": [],
 "chgVsSP": [],
 "CScurr": [],
 "Mcurr": [],
 "WFScurr": [],
 "MQcurr": [],
 "QC": [],
 "QG": [],
 "QV": [],
 'Primary': [],
 }
 */




















































