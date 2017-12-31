const utils = require('../utils');
let database = require('../connection');
let rekey = require('../utils/reKeyIndex.js');


module.exports = (stocks) => {
	return new Promise((resolve, reject) => {
		normalize(stocks, rekey)
			.then((forInsert) => {
				database.stocks.bulkCreate(forInsert)
					.then((result) => {
						console.log(result);
						resolve(result);
					})
			})
	})
};


function normalize(stocks, rekey) {
	return new Promise((resolve, reject) => {
		let records = [];
		for (let i = 0; i < stocks.length; i++) {
			utils.stockImportNormalizeKeys(stocks[i], rekey)
				.then((response) => {
					records.push(response);
				})
				.catch(error => {
					console.error(error);
				})
		}
		resolve(records);
	})
}