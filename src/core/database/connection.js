
const electron = require('electron');
const path = require('path');
const userDir = (electron.app || electron.remote.app).getPath('userData');
const dbPath = path.join(userDir, 'dev.sqlite3');
const baseMigrate = path.resolve(__dirname, '.');

let Sequelize = require('sequelize');




const sequelize = new Sequelize({
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: dbPath
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.accountPositions = require('./models/accountPositions.js')(sequelize, Sequelize);
db.accounts = require('./models/accounts.js')(sequelize, Sequelize);
db.industryGroups = require('./models/industryGroups.js')(sequelize, Sequelize);
db.stocks = require('./models/stock.js')(sequelize, Sequelize);

//sequelize.sync({force: true});
sequelize.sync();


db.accounts.hasMany(db.accountPositions,{targetKey: 'identifier'});
db.accountPositions.belongsTo(db.accounts, {foreignKey: 'identifier', targetKey: 'identifier'});


module.exports = db;

//module.exports = sequelize;

