import { Injectable } from "@angular/core";


@Injectable()
export class PagesDataComm {
    public state: any;

    constructor() {
        this.state = {};
        this.displayData = [];

        this.state.helpText = {
            stocksImport: "stock import help popup text",
            stocksUpload: "click below to select file to upload. Then click import button to begin upload & a timer will appear. A notification will show once the import is complete.",
            stocksUpdate: "stock update help",
            reviewDuplicates: "review duplicates help",
            industryUpload: "industry upload help",
            screenerTopOptions: "Use color to add threshold colors and sums to return data",
            screenerSaveScreen: "Save current screen setup",
            screenerParameters: "Select parameters to apply to screen",
            screenerReturnFields: "Select fields for the screen to return",
            thresholdValues: "Modify threshold values for coloring screen results",
            modelPortfolio: "Modify model portfolio percentages"
        };

        this.state.toolPlacement = {
            stocksImport: "top",
            stocksUpload: "top",
            stocksUpdate: "top",
            reviewDuplicates: "top",
            industryUpload: "top",
            screenerTopOptions: "right",
            screenerSaveScreen: "left",
            screenerParameters: "top",
            screenerReturnFields: "top",
            thresholdValues: "top",
            modelPortfolio: "top"
        }

    }

    setModelPortfolio(value) {
    }

    dispatch(action, value) {

    }


}
