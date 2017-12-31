let Sequelize = require('sequelize');
let connection = require('../connection');
let AccountPositions = require('./accountPositions');

module.exports = function (connection, Sequelize) {
	return connection.define('Accounts', {
		uid: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		identifier: {
			type: Sequelize.STRING,
			unique: true
		},
		valueOne: {type: Sequelize.STRING},
		valueTwo: {type: Sequelize.STRING}
	}, {
		timestamps: true,
		freezeTableName: true
	})

};
/*

let Account = connection.define('Accounts', {
	uid: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	identifier: {type: Sequelize.STRING},
	valueOne: {type: Sequelize.STRING},
	valueTwo: {type: Sequelize.STRING}
}, {
	timestamps: true,
	freezeTableName: true
})

Account.hook('beforeBulkCreate', (records, fields) => {
});

Account.hook('beforeCreate', (record, options) => {
});

//Account.hasMany(AccountPositions, {foreignKey: 'symbol', targetKey: 'identifier'});

//Stock.sync({force: true});
Account.sync({force: true});
module.exports = Account;
*/
