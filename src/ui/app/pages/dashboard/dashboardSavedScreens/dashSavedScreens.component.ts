import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { DashSavedScreensService } from "./dashSavedScreens.service";

import "style-loader!./dashSavedScreens.scss";
import { PagesDataComm } from "../../pagesDataComm.service";


@Component({
    selector: "dash-saved-screens",
    templateUrl: "./dashSavedScreens.html"
})
export class DashSavedScreens {
    private savedList: Array<any>;
    private helpText: object;
    private toolPlacement: object;

    constructor(private _savedService: DashSavedScreensService, private r: ActivatedRoute, private PagesDataComm: PagesDataComm, private router: Router) {
        this.savedList = this._savedService.getSavedList();
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement
    }

    demoFunc(evt){
        console.log("demoFunc", evt);
    }

    loadSaved(screenKey) {
        console.log(screenKey);
        let display = this.savedList[screenKey].display;

        let screen = this.savedList[screenKey].query;
        console.log("screen", screen);
        this._savedService.loadSaved(screen, display, false)
            .then(response => {
                console.log("DETAILED SCREEN RESPONSE", response);
                this.PagesDataComm.displayData = response;
                //, {relativeTo: this.r}
                this.router.navigate(["/pages/screener/resultGrid"]);
                //  this.$state.go("gridDisplay");
                // this.$state.go("altGrid");
            })
    }

}
