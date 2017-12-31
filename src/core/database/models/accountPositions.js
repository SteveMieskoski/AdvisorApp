/*let Sequelize = require('sequelize');
let connection = require('../connection');
let Account = require('./accounts');*/

module.exports = function (connection, Sequelize) {
	return connection.define('AccountPositions', {
		uid: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		identifier: {type: Sequelize.INTEGER},
		AccountUid: {type: Sequelize.INTEGER},
		quantity: {
			type: Sequelize.DOUBLE
		},
		symbol: {type: Sequelize.STRING},
		company: {type: Sequelize.STRING},
		openDate: {type: Sequelize.DATEONLY},
		costAmount: {type: Sequelize.DOUBLE},
		marketPrice: {type: Sequelize.DOUBLE},
		unitCost: {type: Sequelize.DOUBLE},
		blendedUnitCost: {type: Sequelize.DOUBLE},
		value: {type: Sequelize.DOUBLE},
		unrealized: {type: Sequelize.DOUBLE},
		term: {type: Sequelize.STRING},
		percentGainLoss: {type: Sequelize.DOUBLE},
		income: {type: Sequelize.DOUBLE},
		currentYield: {type: Sequelize.DOUBLE},
		giftDate: {type: Sequelize.DATEONLY},
		spPrimaryRating: {type: Sequelize.STRING},
		moodyPrimaryRating: {type: Sequelize.STRING}
	}, {
		timestamps: true,
		freezeTableName: true
	});
};

/*

let AccountPositions = connection.define('AccountPositions', {
		uid: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		quantity: {
			type: Sequelize.DOUBLE
		},
		symbol: {type: Sequelize.STRING},
		company: {type: Sequelize.STRING},
		qpenDate: {type: Sequelize.DATEONLY},
		costAmount: {type: Sequelize.DOUBLE},
		marketPrice: {type: Sequelize.DOUBLE},
		unitCost: {type: Sequelize.DOUBLE},
		blendedUnitCost: {type: Sequelize.DOUBLE},
		value: {type: Sequelize.DOUBLE},
		unrealized: {type: Sequelize.DOUBLE},
		term: {type: Sequelize.STRING},
		percentGainLoss: {type: Sequelize.DOUBLE},
		income: {type: Sequelize.DOUBLE},
		currentYield: {type: Sequelize.DOUBLE},
		giftDate: {type: Sequelize.DATEONLY},
		spPrimaryRating: {type: Sequelize.STRING},
		moodyPrimaryRating: {type: Sequelize.STRING}
	}, {
		timestamps: true,
		freezeTableName: true
	});


AccountPositions.hook('beforeBulkCreate', (records, fields) => {
});

AccountPositions.hook('beforeCreate', (record, options) => {
});
AccountPositions.belongsTo(Account, {foreignKey: 'symbol', targetKey: 'identifier'});

//Stock.sync({force: true});
AccountPositions.sync({force: true});
//module.exports = AccountPositions;

*/
