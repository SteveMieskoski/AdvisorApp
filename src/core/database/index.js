
let connection = require('./connection');
let dataIngress = require('./dataIngress');
let queries = require('./queries');
let utilities = require('./utils');

module.exports = {
	connection,
	// Data import/update
	dataIngress: dataIngress,
	accountImport: dataIngress.accountImport,
	accountUpdate: dataIngress.accountUpdate,
	accountCreate: dataIngress.accountCreate,
	stocksImport: dataIngress.stocksImport,
	stocksUpdate: dataIngress.stocksUpdate,
	industryGroupsImport: dataIngress.industryGroupsImport,
	industryGroupsUpdate: dataIngress.industryGroupsUpdate,

	// Queries
	queries: queries,
	detailedScreen: queries.detailedScreen,
	getAccountListing: queries.getAccountListing,
	getPositionListing: queries.getPositionListing,
	bySymbol: queries.bySymbol,


	// Utilities involving database access
	utilities: utilities,
	staticCreateOrUpdate: utilities.staticCreateOrUpdate
};