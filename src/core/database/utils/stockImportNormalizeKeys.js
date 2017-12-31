let moment = require('moment');
let math = require('mathjs');


module.exports = normalizeKeys;


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
					if (keyIndex[prop] !== "symbol" && keyIndex[prop] !== "company") {
						if (keyIndex[prop] === "WeeklyMomentum") {
							newKeys[keyIndex[prop]] = equity[prop].replace("W", "")
								.replace(" ", '')
								.replace("N/A", "");
						} else if (keyIndex[prop] === "TechAttribScore") {
							newKeys[keyIndex[prop]] = equity[prop].replace("U", "")
								.replace("D", "")
								.replace("%", "")
								.replace("$", "")
								.replace(" ", '')
								.replace("N/A", "");
							newKeys["TechAttribScoreDirection"] = equity[prop].replace("/[0-9]*/", "")
								.replace(" ", '');
						} else {
							newKeys[keyIndex[prop]] = equity[prop].replace("%", "")
								.replace("$", "")
								.replace(",", "")
								.replace("'", "")
								.replace("`", "")
								.replace(" ", '')
								.replace("N/A", "");
						}
					} else {
						newKeys[keyIndex[prop]] = equity[prop].replace("N/A", "");
					}
				}
			}
		}
		let compactCompany = aliasCompany(newKeys.company);
		newKeys["aliasKey"] = newKeys.symbol + compactCompany;
		newKeys["Primary"] = true;
		resolve(newKeys);
	})
}

function aliasCompany(value) {
	return value.replace(" ", "").replace(".", "").replace(",", "").replace("'", "").slice(0, 4);
}



