const Store = require('electron-store');
const store = new Store();


const electron = require('electron');
const path = require('path');
const userDir = (electron.app || electron.remote.app).getPath('userData');
const logPath = path.join(userDir, 'log.log');



// Config Files
const baseConfig = new Store({name: 'baseConfig'});
const savedScreens = new Store({name: 'savedScreens'});
const savedResultDisplay = new Store({name: 'savedResultDisplay'});
const opinionThresholds = new Store({name: 'opinionThresholds'});
const configurations = new Store({name: 'advisorConfigurations'});

const settings = new Store({name: 'advisorSettings'});

function settingsActions(field, action, value){
    if(action === 'set'){
	   return settings.set(field, value);
    } else if(action === 'get'){
       return settings.get(field);
    } else if(action === 'has'){
        return settings.has(field);
    }
}

module.exports = {
    baseConfig,
    savedScreens,
    savedResultDisplay,
    opinionThresholds,
	configurations,
	settingsActions,
	logPath
};





/*const fs = require('fs');
const path = require('path');
const electron = require('electron');
const userDir = (electron.app || electron.remote.app).getPath('userData');

// Config Files
const baseConfig = path.join(userDir, 'baseConfig.json');
const savedScreens = path.join(userDir, 'savedScreens.json');
const savedResultDisplay = path.join(userDir, 'savedResultDisplay.json');
const opinionThresholds = path.join(userDir, 'opinionThresholds.json');


function checkCreateConfigFiles(){
    fs.access(baseConfig, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){}
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(savedScreens, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){}
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(savedResultDisplay, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){}
        console.log(err ? 'no access!' : 'can read/write');
    });
    fs.access(opinionThresholds, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if(err){}
        console.log(err ? 'no access!' : 'can read/write');
    });
}



function loadConfigs(){

}


function updateConfig(){
    fs.readFile()
}
    */