import { Injectable } from "@angular/core";
import XLSX from "xlsx";

@Injectable()
export class ParseSpreadSheetsService {

    constructor() {
    }

    parseWorkbook(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, {type: "binary", cellStyles: true});

                let spreadSheets = [];
                for (let i = 0; i < wb.SheetNames.length; i++) {
                    spreadSheets.push({name: wb.SheetNames[i], content: wb.Sheets[wb.SheetNames[i]]});
                }
               /* var wsname = wb.SheetNames[0];
                console.log("wb", wb);
                var ws = wb.Sheets[wsname];
                console.log("ws", ws);*/
                // note: Should have an option to present a preview view before uploading
                // (i.e. to check if the data selected is the correct file)
                console.log(spreadSheets);
                resolve(spreadSheets);

            };

            reader.readAsBinaryString(file);
        })
    }

    parseSheet(content: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, {type: "binary", cellStyles: true});

                /* grab first sheet */

                var wsname = wb.SheetNames[0];
                console.log("wb", wb);
                var ws = wb.Sheets[wsname];
                console.log("ws", ws);
                // note: Should have an option to present a preview view before uploading
                // (i.e. to check if the data selected is the correct file)

                resolve(ws);

            };

            reader.readAsBinaryString(content);
        })
    }

    parseSpreadsheet(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, {type: "binary", cellStyles: true});

                /* grab first sheet */

                var wsname = wb.SheetNames[0];
                console.log("wb", wb);
                var ws = wb.Sheets[wsname];
                console.log("ws", ws);
                // note: Should have an option to present a preview view before uploading
                // (i.e. to check if the data selected is the correct file)

                resolve(ws);

            };

            reader.readAsBinaryString(file);
        })
    }

    parseIndustryGroupsBW(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, {type: "binary", cellStyles: true, cellHTML: true});

                var wsname;

                let spreadSheets = [];
                for (let i = 0; i < wb.SheetNames.length; i++) {
                    spreadSheets.push({name: wb.SheetNames[i], content: wb.Sheets[wb.SheetNames[i]]});
                }
                resolve(spreadSheets);
                //  resolve(this.parseDWIndustryGroups(ws))
            };

            reader.readAsBinaryString(file);
        })
    }

    importFromSelectedSheetIndustryGroupsBW(file: any) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, {type: "binary", cellStyles: true, cellHTML: true});

                var wsname;

                let spreadSheets = [];
                for (let i = 0; i < wb.SheetNames.length; i++) {
                    spreadSheets.push({name: wb.SheetNames[i], content: wb.Sheets[wb.SheetNames[i]]});
                }
                if (wb.SheetNames.indexOf("Industry Group") >= 0) {
                    /* check if a sheet named Industry Group exists */
                    wsname = wb.SheetNames[wb.SheetNames.indexOf("Industry Group")];
                } else {
                    /* just grab first sheet */
                    wsname = wb.SheetNames[0];
                }

                console.log("wb", wb);
                var ws = wb.Sheets[wsname];
                console.log("ws", ws);
                // note: Should have an option to present a preview view before uploading
                // (i.e. to check if the data selected is the correct file)

                //  resolve(ws);
                //  let output = XLSX.utils.sheet_to_json(ws);
                console.log(ws);
                resolve(ws);
                //  resolve(this.parseDWIndustryGroups(ws))
            };

            reader.readAsBinaryString(file);
        })
    }
}