const _ = require('lodash');
const math = require('mathjs');
//import Store from "../../../vuex/store.js";
const queries = require('../database/queries');


//================= Create Column Content Derived From Other Data Present In Row
// =====================================

export class ColumnCalculationsService {
    constructor( ) {
        this.math = math.create({number: 'BigNumber'});
        this.format = (value) =>{
            return this.math.format(value, {notation: 'fixed', precision: 2})
        }
    }

    calculateBaseColumns(results, options) {
        //  return new Promise((resolve, reject) => {
        //  console.log('calculation data', results);
        return this.buildCurrentTotalColumn(results)
            .then((responseOne) => {

              //  Store.dispatch('setAccountTotal', responseOne[0].total);
                return this.buildCurrentPercentageColumn(responseOne)
                    .then((responseTwo) => {
                        //  resolve(response);
                        return this.buildCurrentSectorColumns(responseTwo)
                            .then((responseThree) => {
                             //   let modelPortfolio = Store.state.client.modelPortfolio;
                             /*   this.CoreService.calc.buildInitialAllocationSpread(responseThree, modelPortfolio)
                                    .then((checking) =>{
                                        _.forEach(checking.portfolio, (value) =>{
                                            console.log('checking value', value.optimalPercent)
                                        })
                                    });*/
                                return this.buildAllocationSpread(responseThree, modelPortfolio)
                                    .then((responseFour) => {
                                        // console.log('responseFour', responseFour.results);
                                        return this.buildProposed(responseFour.results)
                                            .then((responseFive) => {
                                                //resolve(response);
                                                //  console.log('build sector response', responseThree);
                                                return {
                                                    results: responseFive,
                                                    actualPortfolio: responseFour.actualPortfolio
                                                };
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })

                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        // })
    }


    recalculateColumns(results, options) {
        //  return new Promise((resolve, reject) => {
        let recalculate = [
            this.buildCurrentPercentageColumn(results)
        ]

    }

    buildDynamicColumns(results, actualPortfolio) {
        return this.reBuildAllocationSpread(results, actualPortfolio)


    }

    rebuildProposed(results, rowUpdated, fieldUpdated) {

    }

    buildCurrentTotalColumn(results) {
        return new Promise((resolve, reject) => {

            let total = 0;
            for (let i = 0; i < results.length; i++) {
                total = this.math.chain(this.math.bignumber(results[i]['Quantity']))
                    .multiply(this.math.bignumber(results[i]['MarketPrice']))
                    .add(this.math.bignumber(total))
                    .done();
            }

            for (let i = 0; i < results.length; i++) {
                results[i].total = total;
            }
            console.log('build current total', total);
            resolve(results);
        })
    }

    buildCurrentPercentageColumn(results) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < results.length; i++) {
                results[i].percent = this.format(((results[i]['Quantity'] * results[i]['MarketPrice']) / results[i]['total']) * 100);
            }
            resolve(results);
        })
    }

    buildCurrentSectorColumns(results) {
        return new Promise((resolve, reject) => {
            // let equities = {};
            let symbols = [];
            for (let i = 0; i < results.length; i++) {
                symbols.push(results[i].symbol);
            }
            return this.CoreService.queries.symbolQuery(symbols)
                .then((response) => {
                    let details = response;
                    for (let n = 0; n < details.length; n++) {
                        for (let m = 0; m < results.length; m++) {
                            if (details[n].symbol === results[m].symbol) {
                                results[m].sector = details[n]['DWASector'];
                                results[m].MacroSector = details[n].MacroSector;
                                results[m].IndustrySector = details[n].IndustrySector;

                            }
                        }
                    }
                    resolve(results);
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }


    buildAllocationSpread(results, modelPortfolio) {
        return new Promise((resolve, reject) => {
            let actualPortfolio = {};
            let currentPortfolio = {};

            for (let sector in modelPortfolio) {
                actualPortfolio[sector] = {
                    modelPercent: modelPortfolio[sector],
                    positions: _.filter(results, ['MacroSector', sector])
                }
            }


            actualPortfolio = _.forOwn(actualPortfolio, (value, key, object) => {
                let currentSectorPercent = 0;
                let currentSectorValue = 0;
                _.forEach(value.positions , (position) =>{

                    if(position.percent){
                        currentSectorPercent = this.math.add(currentSectorPercent, position.percent)
                    }

                });
                _.forEach(value.positions , (position) =>{
                    if(position.Value){
                        currentSectorValue = this.math.add(currentSectorValue, position.Value)
                    }
                });
                value.currentSectorPercent = currentSectorPercent;
                value.currentSectorValue = currentSectorValue;
            });

            results = _.forEach(results, (value, index, obj) => {
                let macro = _.get(actualPortfolio, value.MacroSector, false);
                if (macro) {
                    value.sectorTotal = this.format(macro.currentSectorPercent);
                    value.percentOfSector = this.format((value.percent / macro.currentSectorPercent) * 100);
                    value.sectorOptimal = this.format(macro.modelPercent);
                    value.optimalPercent = this.format((value.percent / macro.currentSectorPercent) * (macro.modelPercent));
                    let newValue = this.format((value.optimalPercent / 100) * value.total);
                    value.proposedQuantity = this.format(newValue / value['MarketPrice']);
                    value.proposedValue = newValue;
                } else {
                    value.sectorTotal = 0;
                    value.percentOfSector = 0;
                    value.sectorOptimal = 0;
                    value.optimalPercent = 0;
                    // let newValue = this.twoDecimals((value.optimalPercent/100) * value.total);//.toPrecision(8);
                    value.proposedQuantity = value.Quantity;
                    //this.twoDecimals(newValue / value['market price']);
                    value.proposedValue = value.Value;
                }
            });
            resolve({results, actualPortfolio});
        })
    }

    getThing() {
        return Store.state.client.actualPortfolio
    }

    reBuildAllocationSpread(results, actualPortfolio) {
        return new Promise((resolve, reject) => {
            let thing = this.getThing();
            _.forEach(thing, (value, key, obj) => {
                // console.log('use getter', value);
            })

            results = _.forEach(results, (value, index, obj) => {
                let macro = Store.getters.getPortfolioSector(value.MacroSector);
                if (macro) {
                    value.sectorTotal = this.format(macro.currentSectorPercent);
                    value.percentOfSector = this.format((value.percent / macro.currentSectorPercent) * 100);
                    value.sectorOptimal = this.format(macro.modelPercent);
                    value.optimalPercent = this.format((value.percent / macro.currentSectorPercent) * (macro.modelPercent));
                    let newValue = this.format((value.optimalPercent / 100) * value.total);//.toPrecision(8);
                    value.proposedQuantity = this.format(newValue / value['MarketPrice']);
                    value.proposedValue = newValue;
                } else {
                    value.sectorTotal = 0;
                    value.percentOfSector = 0;
                    value.sectorOptimal = 0;
                    value.optimalPercent = 0;
                    value.proposedQuantity = value.Quantity;
                    value.proposedValue = value.Value;
                }
            });
            resolve({results, actualPortfolio});
        })
    }


    buildProposed(results) {
        return new Promise((resolve, reject) => {
            // let resultCopy = window.angular.copy(results);
            let defaultProposal = _.forEach(results, (value, index, object) => {
                // value.proposedPercent = this.format(value.optimalPercent);
                let newValue = this.format((value.optimalPercent / 100) * value.total);//.toPrecision(8);
                value.proposedQuantity = this.format(newValue / value['MarketPrice']);
                value.proposedValue = newValue;
            });
            resolve(defaultProposal)
        })
    }

    buildProRataDataSet(results, value) {
        for (var i = 0; i < results.length; i++) {
            let value = value * (results[i].percent / 100);
            let additionalQuantity = value / results[i]['MarketPrice'];

            results[i].newQuantity = '';
            results[i].newValue = '';
        }
    }

    preserveTotalOnChange() {

    }
}

