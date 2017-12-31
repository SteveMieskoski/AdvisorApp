import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CoreService } from "../../../../core.service";
import { Positions } from "./positions";
import { ParseSpreadSheetsService } from "../../parseSpreadSheets.service";
import { DataImportDataComm } from "../../dataImport.dataComm";
import { PagesDataComm } from "../../../pagesDataComm.service";
import { RebalancerDataComm } from "../../rebalancer.dataComm";

@Component({
    selector: "rebalance",
    templateUrl: "./rebalance.html",
})
export class Rebalance {
    private helpText: object;
    private toolPlacement: object;
    private currentActiveAccount: any;
    private accountContents: Array<any>;
    private expandedPositions: any;
    private showPreparingfile = {
        initial: false,
        update: false
    };
    private fileActionMessage: string;
    private importLength: number;
    private accountListing: Array<any>;
    private positionListing: Array<any>;
    private accountPositions: any;
    public files: Array<any>;
    public SheetJSFT: any;
    public sheetsContained: Array<any>;
    public activeAccount: any;
    public viewItems: any;
    public viewControl: any;


    constructor(public CoreService: CoreService, public Positions: Positions, private router: Router, private r: ActivatedRoute,
                private PagesDataComm: PagesDataComm, private RebalancerDataComm: RebalancerDataComm, private renderer: Renderer) {
        this.CoreService = CoreService;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
        this.viewItems = [{key: "symbol", text: "Symbol", state: true},
            {key: "quantity", text: "Quantity", state: true},
            {key: "costAmount", text: "Cost Amount", state: true},
            {key: "blendedUnitCost", text: "Blended Unit Cost", state: true},
            {key: "value", text: "Current Value", state: true},
            {key: "unrealized", text: "UnRealized Gain/Loss", state: true},
            {key: "percentGainLoss", text: "% Gain/Loss", state: true},
            {key: "income", text: "Generated Income", state: true},
            {key: "currentYield", text: "Current Yield", state: true},
            {key: "openDate", text: "Open Data", state: true},
            {key: "term", text: "Position Term", state: true}
        ];
        this.viewControl = {
            "symbol": true,
            "quantity": true,
            "costAmount": true,
            "blendedUnitCost": true,
            "value": true,
            "unrealized": true,
            "percentGainLoss": true,
            "income": true,
            "currentYield": true,
            "openDate": true,
            "term": true
        };
    }

    ngOnInit() {
        this.accountPositions = this.RebalancerDataComm.getAccountPositions();
        this.activeAccount = this.RebalancerDataComm.getActiveAccount();
        this.Positions.setCurrentData(this.accountPositions)
            .then(() => {
                this.expandedPositions = this.Positions.expandedData;
            })
    }


    showOrHide(val) {
        this.viewItems[val].state = !this.viewItems[val].state;
    }


}
