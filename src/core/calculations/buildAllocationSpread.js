const _ = require('lodash');
const mathjs = require('mathjs');


var math = mathjs.create({number: 'BigNumber'});
var format = (value) => {
    return math.format(value, {notation: 'fixed', precision: 2})
}


module.exports = {
    initial: buildInitialAllocationSpread
};


function buildInitialAllocationSpread(initialPortfolio, modelPortfolio) {
    return new Promise((resolve, reject) => {
        sectorConsolidate(initialPortfolio, modelPortfolio)
            .then(actualPortfolio => {
                actualSectorPercents(actualPortfolio)
                    .then(actualPortfolio => {
                        positionPercentages(initialPortfolio, actualPortfolio)
                            .then(portfolio => {

                                resolve({portfolio, actualPortfolio});
                            })
                    })

            })
        //    console.log(portfolio);

        // actualPortfolio =
        //  portfolio =


    })
}

function positionPercentages(portfolio, actualPortfolio) {
    return new Promise((resolve, reject) => {
        portfolio = _.forEach(portfolio, (value, index, obj) => {
            //console.log(actualPortfolio);
            let macro = _.get(actualPortfolio, value.MacroSector, false);
            //console.log('calculations macrosector', macro);
            if (macro) {
                value.sectorTotal = format(macro.currentSectorPercent);
                value.percentOfSector = format((value.percent / macro.currentSectorPercent) * 100);
                value.sectorOptimal = format(macro.modelPercent);
                value.optimalPercent = format((value.percent / macro.currentSectorPercent) * (macro.modelPercent));
                let newValue = format((value.optimalPercent / 100) * value.total);//.toPrecision(8);
                value.proposedQuantity = format(newValue / value['MarketPrice']);
                value.proposedValue = newValue;
            } else {
                value.sectorTotal = 0;
                value.percentOfSector = 0;
                value.sectorOptimal = 0;
                value.optimalPercent = 0;
                // let newValue = twoDecimals((value.optimalPercent/100) * value.total);//.toPrecision(8);
                value.proposedQuantity = value.Quantity;
                //twoDecimals(newValue / value['market price']);
                value.proposedValue = value.Value;
            }
        });
        resolve(portfolio)
    })
}


function sectorConsolidate(portfolio, modelPortfolio) {
    return new Promise((resolve, reject) => {
        let actualPortfolio = {};
        for (let sector in modelPortfolio) {
            actualPortfolio[sector] = {
                modelPercent: modelPortfolio[sector],
                positions: _.filter(portfolio, ['MacroSector', sector])
            }
        }
        resolve(actualPortfolio);
    })
}


function actualSectorPercents(actualPortfolio) {
    return new Promise((resolve, reject) => {
        actualPortfolio = _.forOwn(actualPortfolio, (value, key, object) => {
            let currentSectorPercent = 0;
            let currentSectorValue = 0;
            _.forEach(value.positions, (position) => {

                if (position.percent) {
                    currentSectorPercent = math.add(currentSectorPercent, position.percent)
                }

            });
            _.forEach(value.positions, (position) => {
                if (position.Value) {
                    currentSectorValue = math.add(currentSectorValue, position.Value)
                }
            });
            value.currentSectorPercent = currentSectorPercent;
            value.currentSectorValue = currentSectorValue;
        });
        resolve(actualPortfolio)
    })
}