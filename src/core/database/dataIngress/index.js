let bulkImport = require("./bulkStockImport");
let bulkUpdate = require('./bulkStockUpdate');
let industryGroupImport = require('./industryGroupsImport');
let industryGroupUpdate = require('./industryGroupsUpdate');
let accountImport = require('./accountPositionsImport');
let accountUpdate = require('./accountPositionsUpdate');
let createAccount = require('./accountCreate');

module.exports = {

	// Account positions bulk insert/update
	accountImport: accountImport,
	accountUpdate: accountUpdate,
	accountCreate: createAccount,

	// Stock Data bulk insert/update
	stocksImport: bulkImport,
	stocksUpdate: bulkUpdate,

	// Industry Groups bulk insert/update
	industryGroupsImport: industryGroupImport,
	industryGroupsUpdate: industryGroupUpdate
};