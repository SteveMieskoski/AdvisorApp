let _ = require('lodash');
let normalizeKeys = require('./normalizeKeys');
let reKeyMap = require('./reKeyIndex');
let staticCreateOrUpdate = require('./staticCreateOrUpdate');
let Model = require('../models/stock');
let stockImportNormalizeKeys = require('./stockImportNormalizeKeys');
let stockUpdateNormalizeKeys = require('./stockUpdateNormalizeKeys');
let accountPositionsNormalizeKeys = require('./accountPositionsNormalizeKeys');



module.exports = {
	stockImportNormalizeKeys: stockImportNormalizeKeys,
	stockUpdateNormalizeKeys: stockUpdateNormalizeKeys,
	accountPositionsNormalizeKeys: accountPositionsNormalizeKeys,
	staticCreateOrUpdate,
	beforeCreate,
	normalizeKeys: function (equity) {
		return normalizeKeys(equity, reKeyMap);
	}
};





function beforeCreate(equity) {
}