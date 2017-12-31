const path = require('path');
const fs = require('fs');

var industryGroupKeys = require('./industryGroupKeys.js');
var macroSectors = require('./macroSectors.js');
var screenerThresholdValues = require('./screener-color-thresholdValues.js');
var sectorMapping = require('./sectorMappingWFAtoDW.js');
var industryGroups = require('./industryGroups');
var fieldToTableColumns = require('./field_to_schema_keys_relations.js');


module.exports = {
    industryGroupKeys,
    industryGroups,
    macroSectors,
    screenerThresholdValues,
    sectorMapping,
    fieldToTableColumns
};


fs.access(path.join(__dirname, 'listIndustryGroups.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(!err){
        module.exports['listIndustryGroups'] = require('./listIndustryGroups.js')
    }
    console.log(err ? 'no access!' : 'can read/write');
});
fs.access(path.join(__dirname, 'listMacroSectors.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(!err){
        module.exports['listMacroSectors'] = require('./listMacroSectors.js')
    }
    console.log(err ? 'no access!' : 'can read/write');
});
fs.access(path.join(__dirname, 'listSymbols.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(!err){
        module.exports['listSymbols'] = require('./listSymbols.js')
    }
    console.log(err ? 'no access!' : 'can read/write');
});
fs.access(path.join(__dirname, 'listCompanies.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(!err){
        module.exports['listCompanies'] = require('./listCompanies.js')
    }
    console.log(err ? 'no access!' : 'can read/write');
});
fs.access(path.join(__dirname, 'listDWASectors.js'), fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(!err){
        module.exports['listDWASectors'] = require('./listDWASectors.js')
    }
    console.log(err ? 'no access!' : 'can read/write');
});

/*
var module_holder = {};

function LoadModules(checkPath) {
    fs.lstat(checkPath, function(err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(checkPath, function(err, files) {
                var f, l = files.length;
                console.log(l);
                for (var i = 0; i < l; i++) {
                    f = path.join(checkPath, files[i]);
                    LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            require(checkPath)(module_holder);
        }
    });
}

var DIR = __dirname;
LoadModules(DIR);

module.exports = module_holder;
    */