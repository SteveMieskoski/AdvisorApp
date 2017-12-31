import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CoreService } from "../../../../core.service";
import { ParseSpreadSheetsService } from "../../parseSpreadSheets.service";
import { DataImportDataComm } from "../../dataImport.dataComm";
import { PagesDataComm } from "../../../pagesDataComm.service";
import { RebalancerDataComm } from "../../rebalancer.dataComm";

@Component({
    selector: "accountview",
    templateUrl: "./accountView.html",
})
export class AccountView {
    private helpText: object;
    private toolPlacement: object;
    private currentActiveAccount: any;
    private accountContents: Array<any>;
    private importActive = {
        initial: false,
        update: false
    };
    private showPreparingfile = {
        initial: false,
        update: false
    };
    private fileActionMessage: string;
    private timerDisplayMinutes: number;
    private timerDisplaySeconds: number;
    private importLength: number;
    private accountListing: Array<any>;
    private positionListing: Array<any>;
    private showCreateAccount: boolean = false;
    public files: Array<any>;
    public SheetJSFT: any;
    public sheetsContained: Array<any>;
    public canUpload = {
        initial: false,
        update: false
    };

    constructor(public CoreService: CoreService, private router: Router, private r: ActivatedRoute,
                private PagesDataComm: PagesDataComm, private RebalancerDataComm: RebalancerDataComm, private renderer: Renderer) {
        this.files = [];
        this.timerDisplaySeconds = 0;
        this.timerDisplayMinutes = 0;
        this.CoreService = CoreService;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }

    ngOnInit() {
    }

    getAllAccounts() {
        this.RebalancerDataComm.clearActiveAccount();
        this.currentActiveAccount = "";
        this.CoreService.database.getAccountListing()
            .then((results) => {
                this.accountListing = results;
                console.log(results);
            })
    }

    setCurrentActiveAccount(currentActiveAccount) {
        this.currentActiveAccount = currentActiveAccount;
        this.getAccountPositions(this.currentActiveAccount);
        this.accountListing = [];
        this.RebalancerDataComm.setActiveAccount(currentActiveAccount);
    }

    getAccountPositions(currentActiveAccount) {
        this.CoreService.database.getPositionListing(currentActiveAccount)
            .then((results) => {
                this.accountContents = results;
                this.RebalancerDataComm.setAccountPositions(results);
                console.log(results);
            })
    }

}
