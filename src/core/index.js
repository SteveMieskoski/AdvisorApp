const path = require('path');
const coreExports = require('./coreExports');
const _ = require('lodash');

//let core = require('./coreExports');

/**
 *  JUST COPY AND PAST WHAT IS PRESENT IN coreExports.js HERE FOR USE WITHIN THE CORE MODULE (TO PREVENT CIRCULAR REFERENCES)
 */


coreExports.emitter.on('appReady', () =>{
    console.log('APPLICATION READY');
});

let whenDbReady = _.debounce(()=>{
    console.log('DATABASE READY');
    coreExports.database.staticCreateOrUpdate();
}, 250);
coreExports.emitter.on('databaseReady', () =>{
  //  console.log('DATABASE READY');
    whenDbReady();
});


module.exports = {
    emitter: coreExports.emitter
};