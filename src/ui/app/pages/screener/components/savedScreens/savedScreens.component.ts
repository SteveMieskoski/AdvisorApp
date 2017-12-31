import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import _ from "lodash";
import "style-loader!./savedScreens.scss";
import { CoreService } from "../../../../core.service";
import { ScreenerDataComm } from "../../screener.dataComm";
import { SavedScreensService } from "../../savedScreens.service";
import { PagesDataComm } from "../../../pagesDataComm.service";


@Component({
    selector: "savedScreens",
    templateUrl: "./savedScreens.html",
    providers: [SavedScreensService]
})
export class SavedScreens implements OnInit {
    private savedScreens: object;
    private display: object;
    private colorResults: boolean;


    constructor(public CoreService: CoreService, public DataComm: ScreenerDataComm,
                private SavedService: SavedScreensService, private router: Router, private r: ActivatedRoute, private PagesDataComm: PagesDataComm) {
        this.CoreService = CoreService;
        this.SavedService = SavedService;
        this.DataComm = DataComm;
        this.CoreService = CoreService;
        this.display = {};
        this.colorResults = false;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }


    ngOnInit() {
        console.log(this.CoreService.config.savedScreens.store);
        this.savedScreens = this.CoreService.config.savedScreens.store
    }

    colored() {
        this.colorResults = !this.colorResults;
        this.DataComm.colorResults = !this.DataComm.colorResults;
    }



    loadSaved(screenKey) {
        let display;
        console.log(this.display);
        if(_.keys(this.display).length !== 0){
            display = _.keys(this.display);
        }  else {
            display = this.savedScreens[screenKey].display;
        }
        let screen = this.savedScreens[screenKey].query;
        console.log("screen", screen);
        this.SavedService.loadSaved(screen, display, this.colorResults)
            .then(response => {
                console.log("DETAILED SCREEN RESPONSE", response);
                this.DataComm.displayData = response;
                this.router.navigate(["../resultGrid"], { relativeTo: this.r });
              //  this.$state.go("gridDisplay");
                // this.$state.go("altGrid");
            })
    }

    deleteSaved(key) {
        this.SavedService.deleteSaved(key)
            .then(() => {

            })
    }

    selectAll() {
        this.display = {
            "symbol": true,
            "company": true,
            "MarketPrice": true,
            "DWASector": true,
            "Category": true,
            "TechAttribScore": true,
            "TrendChartColumn": true,
            "PFTrend": true,
            "PFSignal": true,
            "RSSignal": true,
            "RSColumn": true,
            "PeerRSSignal": true,
            "PeerRSColumn": true,
            "WeeklyMomentum": true,
            "WeeklyDistribution": true,
            "TwoHundredDayMA": true,
            "VertPriceObj": true,
            "RewardRisk": true,
            "Yield": true,
            "UserNote": true,
            "Optionable": true,
            "allUS": true,
            "leastOneBuy": true,
            "MacroSector": true,
            "IndustrySector": true,
            "DividendYield": true,
            "PEG": true,
            "chgVsSP": true,
            "CScurr": true,
            "Mcurr": true,
            "WFScurr": true,
            "MQcurr": true,
            "QC": true,
            "QG": true,
            "QV": true
        }
    }

    unSelectAll() {
        this.display = {}
    }


}
