import { Injectable } from "@angular/core";
import _ from "lodash";

import { CoreService } from "../../core.service";


@Injectable()
export class ResultGridService {
    constructor(private CoreService: CoreService) {
        this.CoreService = CoreService;
    }


    // ============  Column Definitions ====================

    columns(key, withColors) {
        if (withColors) {
            return this.coloredColumns(key);
        } else {
            return this.plainColumns(key);
        }
    }

    plainColumns(key) {
        return new Promise((resolve, reject) => {
            let pinned = ["symbol", "company"];
            let percents = ["greenPercent", "yellowPercent", "redPercent"];
            let singles = ["greenColor", "yellowColor", "redColor"];
            if (singles.indexOf(key) >= 0) {
                let singlesData = {
                    headerName: singles[singles.indexOf(key)],
                    field: key
                };
                resolve(singlesData)
            } else if (percents.indexOf(key) >= 0) {
                let percentsData = {
                    headerName: percents[percents.indexOf(key)],
                    field: key,
                    cellRenderer: this.percentCellRenderer
                };
                resolve(percentsData)
            } else if (pinned.indexOf(key) >= 0) {
                let pinnedData = {
                    headerName: pinned[pinned.indexOf(key)],
                    field: key,
                    pinned: true
                };
                resolve(pinnedData)
            } else {
                let valuesData;
                let numeric = ["chgVsSP", "PEG", "DividendYield", "QC", "QV", "QG"];
                if (numeric.indexOf(key) >= 0) {
                    valuesData = {
                        headerName: this.CoreService.semiStatic.fieldToTableColumns.wellsScreener[key],
                        field: key
                    };
                    resolve(valuesData)
                } else {
                    valuesData = {
                        headerName: this.CoreService.semiStatic.fieldToTableColumns.wellsScreener[key],
                        field: key
                    };
                    //  console.log("values data", valuesData);
                    resolve(valuesData)
                }

            }


        })
    };


    coloredColumns(key) {
        return new Promise((resolve, reject) => {
            let pinned = ["symbol", "company"];
            let percents = ["greenPercent", "yellowPercent", "redPercent"];
            let singles = ["greenColor", "yellowColor", "redColor"];
            if (singles.indexOf(key) >= 0) {
                let singlesData = {
                    headerName: singles[singles.indexOf(key)],
                    field: this.normalizeFieldValue(key, true, false)
                };
                resolve(singlesData)
            } else if (percents.indexOf(key) >= 0) {
                let percentsData = {
                    headerName: percents[percents.indexOf(key)],
                    field: this.normalizeFieldValue(key, true, false),
                    cellRenderer: this.percentCellRenderer
                };
                resolve(percentsData)
            } else if (pinned.indexOf(key) >= 0) {
                let pinnedData = {
                    headerName: pinned[pinned.indexOf(key)],
                    field: this.normalizeFieldValue(key, true, false),
                    pinned: true
                };
                resolve(pinnedData)
            } else {
                let valuesData;
                let numeric = ["chgVsSP", "PEG", "DividendYield", "QC", "QV", "QG"];
                if (numeric.indexOf(key) >= 0) {
                    valuesData = {
                        headerName: this.CoreService.semiStatic.fieldToTableColumns.wellsScreener[key],
                        field: this.normalizeFieldValue(key, true, true),
                        cellStyle: (params) => {
                            return this.colorCell(params, key);
                        }
                    };
                    resolve(valuesData)
                } else {
                    valuesData = {
                        headerName: this.CoreService.semiStatic.fieldToTableColumns.wellsScreener[key],
                        field: this.normalizeFieldValue(key, true, true),
                        cellStyle: (params) => {
                            return this.colorCell(params, key);
                        }
                    };
                    //  console.log("values data", valuesData);
                    resolve(valuesData)
                }

            }


        })
    }

    colorCell(params, key) {
        let value = _.has(params.data[key], "opinion") ? params.data[key].opinion : "";

        switch (value) {
            case "good":
                return {backgroundColor: "green"};
                break;
            case "neutral":
                return {backgroundColor: "yellow"};
                break;
            case "negative":
                return {backgroundColor: "red"};
                break;
            default:
                return;
                break;
        }

    }

    normalizeFieldValue(raw, withColors, colorCheck) {

        if (withColors && colorCheck) {
            return raw + ".value";
        } else {
            console.log(raw);
            return raw;
        }
    }

    percentCellRenderer(params) {
        let value = params.value;

        let eDivPercentBar = document.createElement("div");
        eDivPercentBar.className = "div-percent-bar";
        eDivPercentBar.style.width = value + "%";
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = "red";
        } else if (value < 60) {
            eDivPercentBar.style.backgroundColor = "#ff9900";
        } else {
            eDivPercentBar.style.backgroundColor = "#00A000";
        }

        let eValue = document.createElement("div");
        eValue.className = "div-percent-value";
        eValue.innerHTML = value + "%";

        let eOuterDiv = document.createElement("div");
        eOuterDiv.className = "div-outer-div";
        eOuterDiv.appendChild(eDivPercentBar);
        eOuterDiv.appendChild(eValue);

        return eOuterDiv;
    }


    proficfilterExample() {
        /*var PROFICIENCY_TEMPLATE =
            "<label style="padding-left: 4px;">" +
            "<input type="radio" name="RANDOM"/>" +
            "PROFICIENCY_NAME" +
            "</label>";

        var PROFICIENCY_NONE = "none";
        var PROFICIENCY_ABOVE40 = "above40";
        var PROFICIENCY_ABOVE60 = "above60";
        var PROFICIENCY_ABOVE80 = "above80";

        var PROFICIENCY_NAMES = ["No Filter", "Above 40%", "Above 60%", "Above 80%"];
        var PROFICIENCY_VALUES = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];

        function ProficiencyFilter() {
        }

        ProficiencyFilter.prototype.init = function (params) {
            this.filterChangedCallback = params.filterChangedCallback;
            this.selected = PROFICIENCY_NONE;
            this.valueGetter = params.valueGetter;
        };

        ProficiencyFilter.prototype.getModel = function () {

        };

        ProficiencyFilter.prototype.setModel = function (model) {

        };

        ProficiencyFilter.prototype.getGui = function () {
            var eGui = document.createElement("div");
            var eInstructions = document.createElement("div");
            eInstructions.innerHTML = FILTER_TITLE.replace("TITLE_NAME", "Custom Proficiency Filter");
            eGui.appendChild(eInstructions);

            var random = "" + Math.random();

            var that = this;
            PROFICIENCY_NAMES.forEach( function (name, index) {
                var eFilter = document.createElement("div");
                var html = PROFICIENCY_TEMPLATE.replace("PROFICIENCY_NAME", name).replace("RANDOM", random);
                eFilter.innerHTML = html;
                var eRadio = eFilter.querySelector("input");
                if (index === 0) {
                    eRadio.checked = true;
                }
                eGui.appendChild(eFilter);

                eRadio.addEventListener("click", function () {
                    that.selected = PROFICIENCY_VALUES[index];
                    that.filterChangedCallback();
                });
            });

            return eGui;
        };

        ProficiencyFilter.prototype.doesFilterPass = function (params) {

            var value = this.valueGetter(params);
            var valueAsNumber = parseFloat(value);

            switch (this.selected) {
                case PROFICIENCY_ABOVE40 : return valueAsNumber >= 40;
                case PROFICIENCY_ABOVE60 : return valueAsNumber >= 60;
                case PROFICIENCY_ABOVE80 : return valueAsNumber >= 80;
                default : return true;
            }

        };

        ProficiencyFilter.prototype.isFilterActive = function () {
            return this.selected !== PROFICIENCY_NONE;
        };
        */
    }
}