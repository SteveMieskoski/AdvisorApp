let grid = require('./grid');
let queryParse = require('./queryParse/parsePositionsNoSave');



module.exports = {
    screenerColumns: grid.screenerColumns,
    queryRawSpreadsheetContents: queryParse.queryRawSpreadsheetContents
}