let moment = require('moment');
let math = require('mathjs');


module.exports = normalizeAccountPositionKeys;


function normalizeAccountPositionKeys(position, keyIndex, identifierValue) {
	return new Promise((resolve, reject) => {
		let newKeys = {};
		let individualDataPointCheck = position["SYMBOL"] || position["Symbol"];
		individualDataPointCheck = individualDataPointCheck || position["symbol"];
		if (!/^\s*$/.test(individualDataPointCheck)) {
			for (let prop in position) {
				if (keyIndex[prop]) {
					let value = position[prop];
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
			newKeys['identifier'] = identifierValue;
			//newKeys['AccountUid'] = accountUid;
		}
		resolve(newKeys);
	})
}


function aliasCompany(value) {
	return value.replace(" ", "").replace(".", "").replace(",", "").replace("'", "").slice(0, 4);
}



