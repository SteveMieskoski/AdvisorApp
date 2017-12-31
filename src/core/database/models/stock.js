/*
let Sequelize = require('sequelize');
let connection = require('../connection');
*/


module.exports = function(connection, Sequelize){

	return connection.define('Stocks', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		aliasKey: {
			type: Sequelize.STRING
			// there are some occurrences of duplicates but they are true duplicates versus the prior issue of different company having the same symbol.
			// On Hold regarding implementing any type of solution/hack/work around
		},
		symbol: {type: Sequelize.STRING},
		company: {type: Sequelize.STRING},
		alias: {type: Sequelize.STRING},
		MarketPrice: {type: Sequelize.DECIMAL},
		DWASector: {type: Sequelize.STRING},
		Category: {type: Sequelize.STRING},
		TechAttribScore: {type: Sequelize.INTEGER},
		TechAttribScoreDirection: {type: Sequelize.STRING},
		TrendChartColumn: {type: Sequelize.STRING},
		PFTrend: {type: Sequelize.STRING},
		PFSignal: {type: Sequelize.STRING},
		RSSignal: {type: Sequelize.STRING},
		RSColumn: {type: Sequelize.STRING},
		PeerRSSignal: {type: Sequelize.STRING},
		PeerRSColumn: {type: Sequelize.STRING},
		WeeklyMomentum: {type: Sequelize.INTEGER},
		WeeklyDistribution: {type: Sequelize.DECIMAL},
		"200DayMA": {type: Sequelize.DECIMAL},
		VertPriceObj: {type: Sequelize.DECIMAL},
		RewardRisk: {type: Sequelize.DECIMAL},
		Yield: {type: Sequelize.DECIMAL},
		UserNote: {type: Sequelize.STRING},
		Optionable: {type: Sequelize.BOOLEAN},
		allUS: {type: Sequelize.STRING},
		leastOneBuy: {type: Sequelize.STRING},
		MacroSector: {type: Sequelize.STRING},
		IndustrySector: {type: Sequelize.STRING},
		DividendYield: {type: Sequelize.DECIMAL},
		PEG: {type: Sequelize.DECIMAL},
		chgVsSP: {type: Sequelize.DECIMAL},
		CScurr: {type: Sequelize.STRING},
		Mcurr: {type: Sequelize.STRING},
		WFScurr: {type: Sequelize.STRING},
		MQcurr: {type: Sequelize.STRING},
		QC: {type: Sequelize.INTEGER},
		QG: {type: Sequelize.INTEGER},
		QV: {type: Sequelize.INTEGER},
		Primary: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}

	}, {
		timestamps: true,
		freezeTableName: true
	});
};


/*



let Stock = connection.define('Stocks', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	aliasKey: {
		type: Sequelize.STRING
		// there are some occurrences of duplicates but they are true duplicates versus the prior issue of different company having the same symbol.
		// On Hold regarding implementing any type of solution/hack/work around
	},
	symbol: {type: Sequelize.STRING},
	company: {type: Sequelize.STRING},
	alias: {type: Sequelize.STRING},
	MarketPrice: {type: Sequelize.DECIMAL},
	DWASector: {type: Sequelize.STRING},
	Category: {type: Sequelize.STRING},
	TechAttribScore: {type: Sequelize.INTEGER},
	TechAttribScoreDirection: {type: Sequelize.STRING},
	TrendChartColumn: {type: Sequelize.STRING},
	PFTrend: {type: Sequelize.STRING},
	PFSignal: {type: Sequelize.STRING},
	RSSignal: {type: Sequelize.STRING},
	RSColumn: {type: Sequelize.STRING},
	PeerRSSignal: {type: Sequelize.STRING},
	PeerRSColumn: {type: Sequelize.STRING},
	WeeklyMomentum: {type: Sequelize.INTEGER},
	WeeklyDistribution: {type: Sequelize.DECIMAL},
	"200DayMA": {type: Sequelize.DECIMAL},
	VertPriceObj: {type: Sequelize.DECIMAL},
	RewardRisk: {type: Sequelize.DECIMAL},
	Yield: {type: Sequelize.DECIMAL},
	UserNote: {type: Sequelize.STRING},
	Optionable: {type: Sequelize.BOOLEAN},
	allUS: {type: Sequelize.STRING},
	leastOneBuy: {type: Sequelize.STRING},
	MacroSector: {type: Sequelize.STRING},
	IndustrySector: {type: Sequelize.STRING},
	DividendYield: {type: Sequelize.DECIMAL},
	PEG: {type: Sequelize.DECIMAL},
	chgVsSP: {type: Sequelize.DECIMAL},
	CScurr: {type: Sequelize.STRING},
	Mcurr: {type: Sequelize.STRING},
	WFScurr: {type: Sequelize.STRING},
	MQcurr: {type: Sequelize.STRING},
	QC: {type: Sequelize.INTEGER},
	QG: {type: Sequelize.INTEGER},
	QV: {type: Sequelize.INTEGER},
	Primary: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}

}, {
	timestamps: true,
	freezeTableName: true
});

Stock.hook('beforeBulkCreate', (records, fields) => {
});

Stock.hook('beforeCreate', (record, options) => {
});


//Stock.sync({force: true});
Stock.sync({force: true});
module.exports = Stock;

*/
