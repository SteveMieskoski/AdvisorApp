const fs = require('fs');
const path = require('path');
const electron = require('electron');
const userDir = (electron.app || electron.remote.app).getPath('userData');
const _ = require('lodash');

// Config Files
const configFiles = {
    baseConfig: path.join(userDir, 'baseConfig.json'),
    savedScreens: path.join(userDir, 'savedScreens.json'),
    savedResultDisplay: path.join(userDir, 'savedResultDisplay.json'),
    opinionThresholds: path.join(userDir, 'opinionThresholds.json')
};


class configuration {
    constructor() {
        this.configData = {};
        this.configurations = this.loadConfigs().then(response => {
        })
    }


    checkCreateConfigFiles() {
        fs.access(configFiles.baseConfig, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
            }
            console.log(err ? 'no access!' : 'can read/write');
        });
        fs.access(configFiles.savedScreens, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
            }
            console.log(err ? 'no access!' : 'can read/write');
        });
        fs.access(configFiles.savedResultDisplay, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
            }
            console.log(err ? 'no access!' : 'can read/write');
        });
        fs.access(configFiles.opinionThresholds, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
            }
            console.log(err ? 'no access!' : 'can read/write');
        });
    }


    loadBase() {
        return new Promise((resolve, reject) => {
            fs.readFile(configFiles.baseConfig, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve({})
                } else {
                    resolve(JSON.parse(data))
                }
                console.log(err ? 'no access!' : 'can read/write');
            });
        })
    }

    loadScreens() {
        return new Promise((resolve, reject) => {
            fs.readFile(configFiles.savedScreens, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve({})
                } else {
                    resolve(JSON.parse(data))
                }
                console.log(err ? 'no access!' : 'can read/write');
            });
        })
    }

    loadResultsDisplay() {
        return new Promise((resolve, reject) => {
            fs.readFile(configFiles.savedResultDisplay, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve({})
                } else {
                    resolve(JSON.parse(data))
                }
                console.log(err ? 'no access!' : 'can read/write');
            });
        })
    }

    loadThresholds() {
        return new Promise((resolve, reject) => {
            fs.readFile(configFiles.opinionThresholds, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    resolve({})
                } else {
                    resolve(JSON.parse(data))
                }
                console.log(err ? 'no access!' : 'can read/write');
            });
        })
    }

    loadConfigs() {
        //  return new Promise((resolve, reject) => {
        let configs = [
            this.loadBase(),
            this.loadScreens(),
            this.loadResultsDisplay(),
            this.loadThresholds()
        ];

        function IsJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }
        return Promise.all(configs)
            .then(response => {

                this.configData = {
                    baseConfig: IsJsonString(response[0]) ? {} : JSON.parse(response[0]),
                    savedScreens: IsJsonString(response[1]) ? {} : JSON.parse(response[0]),
                    savedResultDisplay: IsJsonString(response[2]) ? {} : JSON.parse(response[0]),
                    opinionThresholds: IsJsonString(response[3]) ? {} : JSON.parse(response[3]),
                };
                /*  this.configData = {
                 baseConfig: response[0],
                 savedScreens: response[1],
                 savedResultDisplay: response[2],
                 opinionThresholds: response[3]
                 };


                 this.configData = {
                 baseConfig: _.keys(response[0]).length === 0 ? {} : JSON.parse(JSON.stringify(response[0])),
                 savedScreens: _.keys(response[1]).length === 0 ? {} : JSON.parse(JSON.stringify(response[0])),
                 savedResultDisplay: _.keys(response[2]).length === 0 ? {} : JSON.parse(JSON.stringify(response[0])),
                 opinionThresholds: _.keys(response[3]).length === 0 ? {} : JSON.parse(JSON.stringify(response[3])),
                 };
                 */
                return this.configData;
            })

        //resolve();
        //})
    }


    updateConfig(configFile, updateData, updatePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(configFiles[configFile], 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                let currentConfig = JSON.parse(data);
                if (updatePath) {

                } else {
                    let configToSave = JSON.stringify(updateData);
                    // this.configData[configFile] = updateData;
                    fs.writeFile(path.join(userDir, configFile + 'Prior.json'), JSON.stringify(currentConfig), 'utf8', (err, data) => {
                        if (err) {
                            reject(err);
                        }
                    })
                    fs.writeFile(configFiles[configFile], JSON.stringify(configToSave), 'utf8', (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    })
                }
            })
        })
    }
}

let configContents = {};
let configSetup = new configuration();
configSetup.loadConfigs()
    .then((result) => {
        configContents = result;
    });

module.exports = {
    configOps: new configuration(),
    // baseConfig: configContents.baseConfig,
    /* baseConfig: new configuration().configData.baseConfig,
     savedScreens: configContents.savedScreens,
     savedResultDisplay: configContents.savedResultDisplay,
     opinionThresholds: new configuration().configData.opinionThresholds*/
};


/*
 */