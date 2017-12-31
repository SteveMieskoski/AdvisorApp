// Core Methods Entry Point / Core Functions Export
let remote = require('electron').remote;
let emitter = require('./utils/globalEmitter');
let database = require('./database');
let staticFiles = require('./static');
let calc = require('./calculations');
let config = require('./configuration');

//let uiRelated = require('./uiRelated');


module.exports = {
    emitter,
    config,
    calc,
    database,
    things: 'Some things',
    staticFiles
};