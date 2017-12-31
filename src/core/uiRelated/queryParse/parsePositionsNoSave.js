const core = require('../../index');

module.exports = {
    //queryRawSpreadsheetContents
}


function queryRawSpreadsheetContents(rawContents) {
    console.log(core);
    return new Promise((resolve, reject) => {
        let symbols = [];
        for (let i = 0; i < rawContents.length; i++) {
            if (rawContents[i].hasOwnProperty('SYMBOL')) {
                symbols.push(rawContents[i]['SYMBOL'])
            }
        }
        core.queries.symbolQuery(symbols)
            .then(response => {
                // this.CoreService.dataImport.normalizeAccountPositions(response)
                //      .then(response => {
                let displayData = [];
                for (let i = 0; i < response.length; i++) {
                    core.queries.ProcessExternalResults.processQueryResult(response[i])
                        .then(results => {
                            // console.log('parsedResults', results);
                            displayData.push(results)
                        })
                }
                //    })
                resolve(displayData);
                //this.showResultGrid = true;
               // this.$timeout(0);
            });
    })


}