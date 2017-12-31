/*
let Sequelize = require('sequelize');
let connection = require('../connection');
*/

module.exports = function(connection, Sequelize){

	return connection.define('IndustryGroups', {
		uid: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		sector: {
			type: Sequelize.STRING
		},
		color: {type: Sequelize.STRING},
		opinion: {type: Sequelize.STRING}

	}, {
		timestamps: true,
		freezeTableName: true
	});
}


/*

let IndustryGroups = connection.define('IndustryGroups', {
	uid: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	sector: {
		type: Sequelize.STRING
	},
	color: {type: Sequelize.STRING},
	opinion: {type: Sequelize.STRING}

}, {
	timestamps: true,
	freezeTableName: true
});

IndustryGroups.hook('beforeBulkCreate', (records, fields) => {

});

IndustryGroups.hook('beforeCreate', (record, options) => {
});


//Stock.sync({force: true});
IndustryGroups.sync({force: true});
module.exports = IndustryGroups;

*/
