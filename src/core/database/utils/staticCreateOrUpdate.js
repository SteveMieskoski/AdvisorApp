const database = require('../connection');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

let baseDir = path.resolve(__dirname, '../..');
let base = path.resolve(baseDir, 'static');

module.exports = staticCreateOrUpdate;

function staticCreateOrUpdate(){

    console.log('BASE PATH', base);
    fs.access(path.join(base, 'listIndustryGroups.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            createIndustryGroupsList();
        }
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(path.join(base, 'listMacroSectors.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            createMacroSectorsList();
        }
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(path.join(base, 'listSymbols.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            createSymbolsList();
        }
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(path.join(base, 'listCompanies.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            createCompaniesList();
        }
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(path.join(base, 'listDWASectors.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){
            createDWASectorList();
        }
        console.log(err ? 'no access!' : 'can read/write');
    });
}


function createIndustryGroupsList(){
    database.Stocks.findAll({attributes: ['IndustrySector'], where: {$not: null}})
        .then(response =>{
            let allArray = _.map(response, 'IndustrySector');
            let result = _.uniq(allArray);
            console.log('Industry Sector Length:', result.length);
            let toWrite = 'module.exports = ' + JSON.stringify(result);
            fs.writeFile(path.join(base, 'listIndustryGroups.js'), toWrite, (err) =>{
                if(err){
                    console.error('error writing Industry Sector List File');
                }
            })
        })
}

function createMacroSectorsList(){
	database.Stocks.findAll({attributes: ['MacroSector'], where: {$not: null}})
        .then(response =>{
            let allArray = _.map(response, 'MacroSector');
            let result = _.uniq(allArray);
            console.log('Macro Sector Length:', result.length);
            let toWrite = 'module.exports = ' + JSON.stringify(result);
            fs.writeFile(path.join(base, 'listMacroSectors.js'), toWrite, (err) =>{
                if(err){
                    console.error('error writing Industry Sector List File');
                }
            })
        })
}

function createSymbolsList(){
	database.Stocks.findAll({attributes: ['symbol'], where: {$not: null}})
        .then(response =>{
            let allArray = _.map(response, 'symbol');
            let result = _.uniq(allArray);
            console.log('symbols Length:', result.length);
            let toWrite = 'module.exports = ' + JSON.stringify(result);
            fs.writeFile(path.join(base, 'listSymbols.js'), toWrite, (err) =>{
                if(err){
                    console.error('error writing Industry Sector List File');
                }
            })
        })
}

function createCompaniesList(){

	database.Stocks.findAll({attributes: ['company'], where: {$not: null}})
        .then(response =>{
            let allArray = _.map(response, 'company');
            let result = _.uniq(allArray);
            console.log('companies Length:', result.length);
            let toWrite = 'module.exports = ' + JSON.stringify(result);
            fs.writeFile(path.join(base, 'listCompanies.js'), toWrite, (err) =>{
                if(err){
                    console.error('error writing Industry Sector List File');
                }
            })
        })
}

function createDWASectorList(){
	database.Stocks.findAll({attributes: ['DWASector'], where: {$not: null}})
        .then(response =>{
            let allArray = _.map(response, 'DWASector');
            let result = _.uniq(allArray);
            console.log('DWASector Sector Length:', result.length);
            let toWrite = 'module.exports = ' + JSON.stringify(result);
            fs.writeFile(path.join(base, 'listDWASectors.js'), toWrite, (err) =>{
                if(err){
                    console.error('error writing Industry Sector List File');
                }
            })
        })
}