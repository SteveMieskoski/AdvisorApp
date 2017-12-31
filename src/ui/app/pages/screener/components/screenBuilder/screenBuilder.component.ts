import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import _ from "lodash";
import { UpperCasePipe } from "@angular/common";


import "style-loader!./screenBuilder.scss";
import { CoreService } from "../../../../core.service";
import { ScreenerDataComm } from "../../screener.dataComm";
import { PagesDataComm } from "../../../pagesDataComm.service";


@Component({
    selector: "screenBuilder",
    templateUrl: "./screenBuilder.html",
   // encapsulation: ViewEncapsulation.None
})
export class ScreenBuilder implements OnInit {
    private screen: object;
    private display: object;
    private colorResults: boolean;
    private screenOptions: object;
    private listIndustryGroups: any;
    private listMacroSectors: any;
    private listSymbols: Array<string>;
    private listCompanies: Array<string>;
    private listDWASectors: Array<string>;
    private screenNumeric: object;
    private tempSymbol: string;
    private sybmolScreenValues: string;
    private helpText: object;
    private toolPlacement: object;
    public screenLabel: string;


    constructor(public CoreService: CoreService, public DataComm: ScreenerDataComm, private router: Router,
                private r: ActivatedRoute, private PagesDataComm: PagesDataComm) {
        this.CoreService = CoreService;
        this.DataComm = DataComm;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;

        this.screenLabel = "";
        this.listIndustryGroups = this.CoreService.semiStatic.listIndustryGroups;
        this.listMacroSectors = this.CoreService.semiStatic.listMacroSectors;
        this.listSymbols = this.CoreService.semiStatic.listSymbols;
        this.listCompanies = this.CoreService.semiStatic.listCompanies;
        this.listDWASectors = this.CoreService.semiStatic.listDWASectors;
        this.DataComm.colorResults = this.colorResults;
        this.tempSymbol = "";
        this.screen = {};
        this.display = {};
        this.colorResults = false;
        this.screenNumeric = {
            MarketPrice: {
                high: [],
                low: []
            },
            Yield: {
                high: [],
                low: []
            },
            PEG: {
                high: [],
                low: []
            },
            WeeklyMomentum: {
                high: [],
                low: []
            },
            WeeklyDistribution: {
                high: [],
                low: []
            },
            TwoHundredDayMA: {
                high: [],
                low: []
            },
            chgVsSP: {
                high: [],
                low: []
            },
            TechAttribScore: {
                high: [],
                low: []
            }
        }
        this.screenOptions = {
            "symbol": [],
            "company": [],
            "MarketPrice": [],
            "DWASector": [],
            "Category": [],
            "TechAttribScore": [],
            "TrendChartColumn": ["X", "O"],
            "PFTrend": ["P", "N"],
            "PFSignal": ["B", "S"],
            "RSSignal": ["B", "B*", "S", "S*"],
            "RSColumn": ["X", "O"],
            "PeerRSSignal": ["B", "B*", "S", "S*"],
            "PeerRSColumn": ["X", "O"],
            "WeeklyMomentum": [],
            "WeeklyDistribution": [],
            "TwoHundredDayMA": [],
            "VertPriceObj": [],
            "RewardRisk": [],
            "Yield": [],
            "UserNote": [],
            "Optionable": [],
            "allUS": [],
            "leastOneBuy": [],
            "MacroSector": [],
            "IndustrySector": [],
            "DividendYield": [],
            "PEG": [],
            "chgVsSP": [],
            "CScurr": ["Outperform", "Neutral", "Underperform"],
            "Mcurr": ["Buy", "Hold", "Sell"],
            "WFScurr": ["Outperform", "Market perform", "Underperform"],
            "MQcurr": ["Overvalued", "Fairly valued", "Undervalued"],
            "QC": [5, 4, 3, 2, 1],
            "QG": [5, 4, 3, 2, 1],
            "QV": [5, 4, 3, 2, 1],
        };
    }


    ngOnInit() {

        // console.log(this.IndustryGroups);
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


    check() {
        console.log("display", this.display);
        console.log("screen", this.screen);
    }

    removeOptionableChoice() {
        if (_.has(this.screen, "Optionable")) {
            _.unset(this.screen, "Optionable")
        }
    }

    refreshValue(evt, field) {
        let screenValue = _.map(evt, "text");
        console.log("refreshed evt", evt, field, screenValue);
        this.screen[field] = screenValue;
    }

    typed(value) {
        console.log("typed value", value);
    }

    selected(value) {
        console.log("selected method", value);
    }

    removed(value) {
        console.log("removed value", value);
    }

    removeSymbol(i) {
        this.screen.symbol.splice(i, 1);
    }

    removeAllUSChoice() {
        if (_.has(this.screen, "allUS")) {
            _.unset(this.screen, "allUS")
        }
    }

    colored() {
        this.colorResults = !this.colorResults;
        this.DataComm.colorResults = !this.DataComm.colorResults;
    }

    addSymbolToScreen(value) {
        console.log("addSymbolToScreen value", value);
        if (Array.isArray(this.screen.symbol)) {
            this.screen.symbol.push(value.item.toUpperCase());
        } else {
            this.sybmolScreenValues = "array";
            this.screen.symbol = [value.item.toUpperCase()]
        }
        this.tempSymbol = "";
    }

    saveBuiltScreen(form: NgForm){
        let display = _.keys(this.display);
        let screen = this.checkCleanNumeric(this.screenNumeric, this.screen);
        // this.DataComm.lastScreen = this.screen;
        console.log("form", form);
        console.log("this.screenLabel", this.screenLabel);
        console.log("screen", screen);
        console.log("display", display);
        this.DataComm.saveWholeScreen(this.screenLabel, screen, display);
    }

    run() {
        let display = _.keys(this.display);
        let screen = this.checkCleanNumeric(this.screenNumeric, this.screen);
        // this.DataComm.lastScreen = this.screen;
        this.DataComm.lastScreen = screen;
        this.DataComm.lastDisplay = display;
        this.DataComm.colorResults = this.colorResults;
        console.log("SCREEN", screen);
        console.log("DISPLAY", display);
           this.CoreService.database.detailedScreen(screen, display, this.colorResults)
                  .then(response => {
                      console.log("DETAILED SCREEN RESPONSE", response);
                      this.DataComm.displayData = response;
                      this.router.navigate(["../resultGrid"], { relativeTo: this.r });
                  })

    }

    checkCleanNumeric(num, screen) {
        for (let prop of num) {
            if (num[prop].high.length !== 0) {
                screen[prop].high = num[prop].high[0]
            }
            if (num[prop].low.length !== 0) {
                screen[prop].low = num[prop].low[0]
            }
        }
        return screen;
    }



}
