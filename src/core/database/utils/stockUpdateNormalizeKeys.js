let moment = require('moment');
let math = require('mathjs');


module.exports = normalizeUpdateKeys;


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
						if (keyIndex[prop] === "WeeklyMomentum") {
							newKeys[keyIndex[prop]] = equity[prop].replace("W", "").replace("N/A", "");
						} else if (keyIndex[prop] === "TechAttribScore") {
							newKeys[keyIndex[prop]] = equity[prop].replace("U", "")
								.replace("D", "")
								.replace("%", "")
								.replace("$", "")
								.replace("N/A", "");
							newKeys["TechAttribScoreDirection"] = equity[prop].replace("/[0-9]*/", "");
						} else {
							newKeys[keyIndex[prop]] = equity[prop].replace("%", "")
								.replace("$", "")
								.replace(",", "")
								.replace("'", "")
								.replace("`", "")
								.replace("N/A", "");
						}

						//	newKeys[keyIndex[prop]] = equity[prop]
					}
				} else {
					forAliasCreate[keyIndex[prop]] = equity[prop]
				}
			}
		}
		let compactCompany = aliasCompany(forAliasCreate.company);
		newKeys["aliasKey"] = forAliasCreate.symbol + compactCompany;
		newKeys["Primary"] = true;
		resolve(newKeys);
	})
}


function aliasCompany(value) {
	return value.replace(" ", "").replace(".", "").replace(",", "").replace("'", "").slice(0, 4);
}



