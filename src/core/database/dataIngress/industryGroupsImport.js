var uuid = require('uuid');
let moment = require('moment');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
let emitter = new EventEmitter();
let industryGroupsKeys = require('../utils/industryGroupKeys');
let database = require('../connection');

let basePath = path.resolve(__dirname, '../..');
let filePath = path.join(basePath, 'static/industryGroups.js');

module.exports = insertIndustryGroupData;

emitter.on('buildIndustryGroup', (data) =>{
	fs.writeFile(filePath, 'module.exports =' + JSON.stringify(data.parsed), 'utf8', (err, data) =>{
		if(err) throw err;
	})
});



function insertIndustryGroupData(importedData) {
	return new Promise((resolve, reject) => {
		parseDWIndustryGroups(importedData)
			.then((response) =>{
				emitter.emit('buildIndustryGroup', response);
					bulkIndustryGroupsInsert(response.array, 'industryGroups')
						.then(function (ids) {
							resolve(ids)
						})
						.catch(function (error) {
							console.error('importIndustryGroupData', error);
							reject(error);
						});
			})

	})
}


function bulkIndustryGroupsInsert(data) {
	return new Promise((resolve, reject) => {
		database.industryGroups.bulkCreate(data)
			.then((result) => {
				console.log(result);
				resolve(result);
			})
			.catch(function (error) {
				console.error('allStocksBulkImport', error);
				reject(error);
			});
	})
}


function parseDWIndustryGroups(raw) {
	return new Promise((resolve, reject) => {

		var ind = {};
		var indAry = [];
		for (let prop in raw) {
			if (!/!/.test(prop)) {
				console.log(raw[prop].v);
				let name = raw[prop].v.replace('.', '');
				// noticed when I ran this on windows the bgColor object was indexed: 64 & fgColor object contained a color value
				let value;
				if (raw[prop].s.bgColor.hasOwnProperty('rgb')) {
					console.log(raw[prop].s.bgColor.rgb);
					value = raw[prop].s.bgColor.rgb;
					ind[raw[prop].v] = '#' + value;
				} else if (raw[prop].s.fgColor.hasOwnProperty('rgb')) {
					console.log(raw[prop].s.fgColor.rgb);
					value = raw[prop].s.fgColor.rgb;
					ind[raw[prop].v] = '#' + value;
				}
				console.log(value);
				switch (value) {
					// I encountered Issues with color codes when running this on my windows machine
					case 'FFFFFF':
						// yellow
						// (getting calculated as white by JS-XLSX)
						industryGroupsKeys[raw[prop].v] = '#fcfa56';
						indAry.push({sector: raw[prop].v, color: '#fcfa56', opinion: 'neutral'});
						//  industryGroups[raw[prop].v] = '#FCF8E3';
						break;
					case 'FCF8E3':
						// yellow (newer)
						industryGroupsKeys[raw[prop].v] = '#fcfa56';
						indAry.push({sector: raw[prop].v, color: '#fcfa56', opinion: 'neutral'});
						//  industryGroups[raw[prop].v] = '#FCF8E3';
						break;
					case "F2DEDE":
						// green
						industryGroupsKeys[raw[prop].v] = '#7fee5b';
						indAry.push({sector: raw[prop].v, color: '#7fee5b', opinion: 'good'});
						// industryGroups[raw[prop].v] = '#' + raw[prop].s.bgColor.rgb;
						break;
					case "dff0d8":
						// green (newer)
						industryGroupsKeys[raw[prop].v] = '#dff0d8';
						indAry.push({sector: raw[prop].v, color: '#7fee5b', opinion: 'good'});
						// industryGroups[raw[prop].v] = '#' + raw[prop].s.bgColor.rgb;
						break;
					//
					case '7FEE5B':
						//red (newer)
						industryGroupsKeys[raw[prop].v] = '#fc6561';
						indAry.push({sector: raw[prop].v, color: '#fc6561', opinion: 'negative'});
						// industryGroups[raw[prop].v] = '#' + raw[prop].s.bgColor.rgb;
						break;
					case "DFF0D8": // backwards
						//red
						industryGroupsKeys[raw[prop].v] = '#fc6561';
						indAry.push({sector: raw[prop].v, color: '#fc6561', opinion: 'negative'});
						// industryGroups[raw[prop].v] = '#' + raw[prop].s.bgColor.rgb;
						break;
					default:
						industryGroupsKeys[raw[prop].v] = '#' + value;
						indAry.push({sector: raw[prop].v, color: '#' + value, opinion: 'other'});
						break;
				}
			}
		}
		resolve({raw: ind, parsed: industryGroupsKeys, array: indAry});
	})
}


