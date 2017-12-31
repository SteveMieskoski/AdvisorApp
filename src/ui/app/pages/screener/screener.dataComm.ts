import { Injectable } from "@angular/core";
import _ from "lodash";
import { CoreService } from "../../core.service";

@Injectable()
export class ScreenerDataComm {
    public data: object;
    public colorResults: boolean;
    public lastScreen: object;
    public lastDisplay: object;
    public displayData: Array<object>;

    constructor(public CoreService: CoreService) {
        this.data = {};
        this.colorResults = false;
        this.lastScreen = {};
        this.lastDisplay = {};
        this.displayData = [];
    }

    saveWholeScreen(screenLabel, newScreen, newDisplay) {
        let screen = newScreen || this.lastScreen;
        let display = newDisplay || this.lastDisplay;
        console.log(this.lastScreen);
        console.log(this.CoreService.config);
        if (!this.CoreService.config.savedScreens.has(screenLabel) && screenLabel !== "") {
            let screenDetails = {};
            screenDetails["query"] = screen;
            screenDetails["display"] = display;
            this.CoreService.config.savedScreens.set(screenLabel, screenDetails);
            alert("Saved");
        } else {
            alert("Screens Must Have Unique Names. (I still need to make a browser to see existing saved)")
        }
    }

    setData(data) {
        this.data = data;
    }

    setDisplayData(data) {
        this.displayData = data;
    }

    setColorResults(value) {
        this.colorResults = value;
    }

    setLastScreen(data) {
        this.lastScreen = data;
    }

    setLastDisplay(data) {
        this.lastDisplay = data;
    }

}