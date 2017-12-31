const _ = require('lodash');
//import Store from "../../../vuex/store.js";
const queries = require('../database/queries');


//================= Create Column Content Derived From Other Data Present In Row
// =====================================

export class ColumnCalculationsService {
    constructor(rawPortfolio, modelPortfolio) {
        this.math = require('mathjs').create({number: 'BigNumber'});
        this.format = (value) => {
            return this.math.format(value, {notation: 'fixed', precision: 2})
        };
        this.currentPortfolio = rawPortfolio;
        this.portfolio = _.cloneDeep(rawPortfolio);
        this.modelPortfolio = modelPortfolio;
        this.bySector = {};
        this.bySectorCalc = {}

    }





    breakdownBySector() {
        for (let sector in this.modelPortfolio) {
            this.bySector[sector] = {
                modelPercent: this.modelPortfolio[sector],
                positions: _.filter(this.portfolio, ['MacroSector', sector])
            };
            this.bySectorCalc[sector] = {
                modelPercent: this.modelPortfolio[sector],
                positions: _.filter(this.portfolio, ['MacroSector', sector]),
                currentSectorPercent: () => {
                    let currentSectorPercent = 0;
                    let positionsCalc = _.filter(this.portfolio, ['MacroSector', sector]);
                    _.forEach(positionsCalc, (position) => {
                        if (position.percent) {
                            currentSectorPercent = this.math.add(currentSectorPercent, position.percent)
                        }
                    });
                    return currentSectorPercent;
                },
                currentSectorValue: () => {
                    let currentSectorValue = 0;
                    let valuesCalc = _.filter(this.portfolio, ['MacroSector', sector]);
                    _.forEach(valuesCalc, (position) => {
                        if (position.Value) {
                            currentSectorValue = this.math.add(currentSectorValue, position.Value)
                        }
                    });
                    return currentSectorValue;
                }
            }
        }
        this.bySector = _.forOwn(this.bySector, (value, key, object) => {
            let currentSectorPercent = 0;
            let currentSectorValue = 0;
            _.forEach(value.positions, (position) => {

                if (position.percent) {
                    currentSectorPercent = this.math.add(currentSectorPercent, position.percent)
                }

            });
            _.forEach(value.positions, (position) => {
                if (position.Value) {
                    currentSectorValue = this.math.add(currentSectorValue, position.Value)
                }
            });
            value.currentSectorPercent = currentSectorPercent;
            value.currentSectorValue = currentSectorValue;
        });
    }


    combinePositionData(positions) {
        return new Promise((resolve, reject) => {
            let symbols = [];
            for (let i = 0; i < positions.length; i++) {
                symbols.push(positions[i].symbol);
            }
            queries.symbolQuery(symbols)
                .then((response) => {
                    let combined = _.mergeWith(positions, response, (objValue, srcValue, key) => {
                        if (key === 'symbol' || key === 'company' || key === 'Primary') {
                            return objValue;
                        }
                    });

                    resolve(combined);
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }


}

