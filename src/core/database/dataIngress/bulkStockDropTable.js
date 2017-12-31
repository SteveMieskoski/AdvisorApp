const utils = require('../utils');
let database = require('../connection');
let rekey = require('../utils/reKeyIndex');


module.exports = (stocks) => {
	return new Promise((resolve, reject) => {
		normalize(stocks, rekey)
			.then((forInsert) => {
				let promiseArray = [];
				for (let i = 0; i < forInsert.length; i++) {
					promiseArray.push(database.stocks.upsert(forInsert[i], {where: {aliasKey: forInsert[i].aliasKey}}));
				}
				Promise.all(promiseArray)
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
			utils.stockUpdateNormalizeKeys(stocks[i], rekey)
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