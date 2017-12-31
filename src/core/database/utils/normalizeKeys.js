let moment = require('moment');
let math = require('mathjs');


module.exports = {
	normalizeKeys,
	normalizeUpdateKeys,
	normalizeAccountPositionKeys
};


function normalizeKeys(equity, keyIndex) {
	return new Promise((resolve, reject) => {
		let newKeys = {};
		for (let prop in equity) {
			if (keyIndex[prop]) {
				if (prop === "DWA Sector") {
					let DW_Sector;
					let DW_SectorMatch = equity["DWA Sector"].match(/.*\B(?=B)/);
					if (DW_SectorMatch) {
						DW_Sector = DW_SectorMatch[0].replace('.', '');
					} else {
						DW_Sector = 'N/A';
					}
					newKeys["DWASector"] = DW_Sector;
				} else {
					newKeys[keyIndex[prop]] = equity[prop]
				}
			}
		}
		let compactCompany = aliasCompany(newKeys.company);
		newKeys["aliasKey"] = newKeys.symbol + compactCompany.slice(0, 4);
		newKeys["Primary"] = true;
		resolve(newKeys);
	})
}


function normalizeUpdateKeys(equity, keyIndex) {
	return new Promise((resolve, reject) => {
		let newKeys = {};
		let forAliasCreate = {};
		for (let prop in equity) {
			if (keyIndex[prop]) {
				if (keyIndex[prop] !== "symbol" && keyIndex[prop] !== "company") {
					if (prop === "DWA Sector") {
						let DW_Sector;
						let DW_SectorMatch = equity["DWA Sector"].match(/.*\B(?=B)/);
						if (DW_SectorMatch) {
							DW_Sector = DW_SectorMatch[0].replace('.', '');
						} else {
							DW_Sector = 'N/A';
						}
						newKeys["DWASector"] = DW_Sector;
					} else {
						newKeys[keyIndex[prop]] = equity[prop]
					}
				} else {
					forAliasCreate[keyIndex[prop]] = equity[prop]
				}
			}
		}
		let compactCompany = aliasCompany(forAliasCreate.company);
		newKeys["aliasKey"] = forAliasCreate.symbol + compactCompany.slice(0, 4);
		newKeys["Primary"] = true;
		resolve(newKeys);
	})
}

function normalizeAccountPositionKeys(equity, keyIndex, identifierValue) {
	return new Promise((resolve, reject) => {
		let newKeys = {};
		let individualDataPointCheck = position[i]["SYMBOL"] || position[i]["Symbol"];
		individualDataPointCheck = individualDataPointCheck || position[i]["symbol"];
		if (!/^\s*$/.test(individualDataPointCheck)) {
			for (let prop in equity) {
				if (keyIndex[prop]) {
					let value = equity[prop];
					value = value.replace(",", "").replace("'", "").replace("`", "").replace("%", "").replace("$", "");
					var dateRegex = /^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/g;
					var numberRegex = /-?[0-9]*\.[0-9]*/;
					if (dateRegex.test(value)) {
						let dataValue = moment(value, "MM-DD-YYYY");
						newKeys[keyIndex[prop]] = dataValue.format();
					} else if (numberRegex.test(value)) {
						newKeys[keyIndex[prop]] = math.bignumber(value).valueOf();
					} else {
						newKeys[keyIndex[prop]] = value;
					}
				}
			}
			newKeys['identifier'] = identifierValue
		}
		resolve(newKeys);
	})
}


function aliasCompany(value) {
	return value.replace(" ", "").replace(".", "").replace(",", "").replace("'", "");
}



