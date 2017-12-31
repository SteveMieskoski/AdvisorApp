const _ = require('lodash');
const mathjs = require('mathjs');


var math = mathjs.create({number: 'BigNumber'});
var format = (value) => {
    return math.format(value, {notation: 'fixed', precision: 2})
}


function ingress(sector,) {

}

var dataStructurePortfolio = {
    totalValue: "",
    modelPorfolio: {sectorName: "sector Percent"},
    rawHoldings: [],
    holdingsBySector: {
        sectorName: {
            current: {
              value: ''
            },
            sectorPositions: [
                {details: {
                    symbol: "",
                    company: "",
                    MarketPrice: "",
                    Quantity: ""
                },
                    calculated: {
                        percentOfSector: ""
                    }

                }
            ]
        }
    }


};


function modelPercentageModified(portfolio, sector) {
    let newSectorValue = math.chain(modelPortfolio[sector]).divide(100).multiply(portfolio.totalValue);
    let positions = portfolio.holdingsBySector[sector].sectorPositions;
    positions = _.forEach(positions, (item, idx, all) => {
                console.log('sectorOptimal value in switch', item.company, item.optimalPercent);
                item.proposedValue = math.chain(item.calculated.percentOfSector).divide(100).multiply(newSectorValue) ; //((newValue / 100) * (item.percentOfSector / 100)) * currentTotal;
                item.proposedQuantity = item.proposedValue / item['market price'];
                item.optimalPercent = ((newValue / 100) * (item.percentOfSector / 100)) * 100;
                item.sectorOptimal = newValue;
                console.log('sectorOptimal value in switch', item.company, item.optimalPercent);
        });
}


function checkGridEdit(portfolioSector, fieldModified) {

    /*for (let i = 0; i < currentData.length; i++) {
     if (currentData[i]._id === rowEntity._id) {
     let macro = Store.getters.getPortfolioSector(currentData[i].MacroSector);

     if (macro) {
     let currentTotal = Store.getters.getPortfolioTotal();
     if (currentData[i].MacroSector === rowEntity.MacroSector) {
     switch (colDef.field) {
     case 'sectorOptimal':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.MacroSector === rowEntity.MacroSector) {  // <-- Should be _id, but I want to update each in the sector.
     console.log('sectorOptimal value in switch', item.company, item.optimalPercent);
     item.proposedValue = ((newValue / 100) * (item.percentOfSector / 100)) * currentTotal;
     item.proposedQuantity = item.proposedValue / item['market price'];
     item.optimalPercent = ((newValue / 100) * (item.percentOfSector / 100)) * 100;
     item.sectorOptimal = newValue;
     console.log('sectorOptimal value in switch', item.company, item.optimalPercent);
     }
     });
     break;
     case 'proposedValue':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.MacroSector === rowEntity.MacroSector) {
     item.proposedValue = newValue;
     // (newValue * item.percentOfSector) * currentTotal;
     item.proposedQuantity = newValue / item['market price'];
     let OptimalPerct = window.angular.copy(item.optimalPercent);
     item.optimalPercent = newValue / currentTotal;//(item.optimalPercent * item.percentOfSector);
     item.sectorOptimal = item.sectorOptimal + (item.optimalPercent - OptimalPerct);
     console.log('proposedValue value in switch', item);
     }
     });
     break;
     case 'proposedQuantity':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.MacroSector === rowEntity.MacroSector) {
     item.proposedValue = newValue * item['market price'];
     // (newValue * item.percentOfSector) * currentTotal;
     item.proposedQuantity = newValue;
     item.optimalPercent = item.proposedValue / currentTotal;//(item.optimalPercent * item.percentOfSector);
     item.sectorOptimal = item.sectorOptimal + ((item.optimalPercent / 100) * (item.percentOfSector / 100))
     console.log('proposedQuantity value in switch', item);
     }
     });
     break;
     }
     }
     this.gridOptions.data = currentData;
     this.gridApi.core.notifyDataChange(this.uiGridConstants.dataChange.ALL);
     this.gridApi.core.notifyDataChange(this.uiGridConstants.dataChange.OPTIONS);
     } else {
     let currentTotal = Store.getters.getPortfolioTotal();
     console.log(colDef.field);
     switch (colDef.field) {
     case 'sectorOptimal':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.symbol === rowEntity.symbol) {  // <-- Should be _id
     item.proposedValue = this.twoDecimals((newValue / 100) * currentTotal);
     item.proposedQuantity = this.twoDecimals(item.proposedValue / item['market price']);
     item.optimalPercent = this.twoDecimals(newValue);
     item.sectorOptimal = this.twoDecimals(newValue);
     }
     });
     break;
     case 'proposedValue':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.symbol === rowEntity.symbol) {
     item.proposedValue = this.twoDecimals(newValue);
     item.proposedQuantity = this.twoDecimals(newValue / item['market price']);
     item.optimalPercent = this.twoDecimals(newValue / currentTotal);//(item.optimalPercent * item.percentOfSector);
     item.sectorOptimal = this.twoDecimals(item.optimalPercent);
     }
     });
     break;
     case 'proposedQuantity':
     currentData = _.forEach(currentData, (item, idx, all) => {
     if (item.symbol === rowEntity.symbol) {
     item.proposedValue = this.twoDecimals(newValue * item['market price']);
     item.proposedQuantity = this.twoDecimals(newValue);
     item.optimalPercent = this.twoDecimals(item.proposedValue / currentTotal);//(item.optimalPercent * item.percentOfSector);
     item.sectorOptimal = this.twoDecimals(item.optimalPercent / 100);
     }
     });
     break;
     }
     this.chartData = currentData;
     this.gridOptions.data = currentData;
     this.gridApi.core.notifyDataChange(this.uiGridConstants.dataChange.ALL);
     this.gridApi.core.notifyDataChange(this.uiGridConstants.dataChange.OPTIONS);
     }
     }
     }
     this.$rootScope.$emit('updateChart', this.chartData);*/
}