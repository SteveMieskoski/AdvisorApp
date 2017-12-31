const utils = require('../utils');
let rekey = require('../utils/reKeyIndex');
let database = require('../connection');
var uuid = require('uuid');

module.exports = updateAccountPositions;



function updateAccountPositions(accounts, identifier) {
	console.log(identifier);
	return new Promise((resolve, reject) => {
		if(identifier){
			updateNormalize(accounts, rekey, identifier)
				.then((forInsert) => {
					let promiseArray = [];
					for (let i = 0; i < forInsert.length; i++) {
						promiseArray.push(database.accountPositions.upsert(forInsert[i], {where: {identifier: identifier, symbol: forInsert[i].symbol}}));
					}
					Promise.all(promiseArray)
						.then((result) => {
							console.log(result);
							resolve(result);
						})
				})
		} else {
			reject({"msg": "NO Account Identifier Specified"})
		}

	})
};


function updateNormalize(accounts, rekey, identifier) {
	return new Promise((resolve, reject) => {
		let records = [];
		let identifierValue;
		for (let i = 0; i < accounts.length; i++) {
			identifierValue = identifier;
			utils.accountPositionsNormalizeKeys(accounts[i], rekey, identifierValue)
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