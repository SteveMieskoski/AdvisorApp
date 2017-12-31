const utils = require('../utils');
let rekey = require('../utils/reKeyIndex');
let database = require('../connection');
var uuid = require('uuid');

module.exports = createAccount;

function createAccount(values, identifier) {
	return new Promise((resolve, reject) => {
		let internalIdentifier = identifier || undefined;
		if (internalIdentifier) {
			internalIdentifier = identifier;
		} else {
			internalIdentifier = uuid.v4();
		}
		values["identifier"] = internalIdentifier;
		database.accounts.create(values)
			.then((result) => {
				console.log(result);
				resolve(result);
			})
	})

};


function insertNormalize(accounts, rekey, identifier) {
	return new Promise((resolve, reject) => {
		let records = [];
		let identifierValue;
		if (identifier) {
			identifierValue = identifier;
		} else {
			identifierValue = uuid.v4();
		}
		for (let i = 0; i < accounts.length; i++) {
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

