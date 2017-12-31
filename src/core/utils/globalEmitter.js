// (intend this to be) a broad communication avenue;
const EventEmitter = require('events');
let emitter = new EventEmitter();
module.exports = emitter;