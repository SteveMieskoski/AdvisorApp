const db = require('../database');


class Positions {


	constructor(currentData, db) {
		this.currentData = currentData;
		this.db = db;
		this.expandedData = {};
	}

	calcPortfolioTotal() {
		for (let i = 0; i < this.currentData.length; i++) {
			this.totalValue += this.currentData[i].quantity * this.currentData[i].marketPrice;
		}
	};

	calcPositionPercents() {
		for (let i = 0; i < this.currentData.length; i++) {
			this.currentData[i].percentTotal += (this.currentData[i].quantity * this.currentData[i].marketPrice) / this.totalValue;
		}
	}

	getDetailsForPositions() {
		for (let i = 0; i < this.currentData.length; i++) {
			db.bySymbol( this.currentData[i].symbol)
				.then((result) => {
					/*this.completeData = this.currentData[i];
					for(let prop in result){
						this.completeData["calc" + prop] = result[prop];
					}*/
					this.expandedData[this.currentData[i].symbol] = result;
				})
		}
	}


	determinePositionOpinion(){
		for (let i = 0; i < this.currentData.length; i++) {
			if(this.expandedData[this.currentData[i].symbol].greenPercent >= 80){
				
			}
		}
	}




}

module.exports = Positions;