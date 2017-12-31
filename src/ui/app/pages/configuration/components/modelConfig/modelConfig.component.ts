import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { CoreService } from "../../../../core.service";
import { AppDataComm } from "../../../../appDataComm.service";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Component({
    selector: "modelconfig",
    templateUrl: "./modelConfig.html",
})
export class ModelConfig implements OnInit {
    private modelPortfolio: object;
    private dummyPortfolioValues: object;
    private sectorOptions: Array<string>;
    private portfolioTotal: number;
    private helpText: object;
    private toolPlacement: object;

    constructor(private CoreService: CoreService, public AppDataComm: AppDataComm, private PagesDataComm: PagesDataComm) {
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;

        this.dummyPortfolioValues = {
            "Consumer discretionary": 14.9,
            "Consumer staples": 8.5,
            "Energy": 6.5,
            "Financials": 13.5,
            "Health care": 17.2,
            "Industrials": 11.6,
            "Information technology": 21.8,
            "Materials": 3.0,
            "Telecommunication services": 0.0,
            "Utilities": 0.0,
            "Real estate": 3.0,
            "Cash": 0.0,
        }
    }

    ngOnInit() {
        this.sectorOptions = this.CoreService.semiStatic.macroSectors;
        this.modelPortfolio = {};
        let modelPortCheck = this.CoreService.config.settingsActions("modelPortfolio", "has");
        console.log("model portfolio present", modelPortCheck);
        if (this.AppDataComm.state.client.modelPortfolio) {
            this.loadSavedValues();
        } else {
            this.distributeSectors(this.CoreService.semiStatic.macroSectors, this.dummyPortfolioValues)
        }
    }

    distributeSectors(macroSectors, defaultModel) {
        if (!macroSectors) {
            macroSectors = this.sectorOptions;
        }
        if (defaultModel) {
            for (let sector in macroSectors) {
                this.modelPortfolio[sector] = defaultModel[sector];
                this.modelPortfolio["Cash"] = defaultModel["Cash"];
            }
        } else {
            for (let sector in macroSectors) {
                this.modelPortfolio[sector] = 0;
                this.modelPortfolio["Cash"] = 0;
            }
        }
        this.updateTotal(this.modelPortfolio);
    }

    loadSavedValues() {
        let loadedModel = {};
        for (let sector in this.AppDataComm.state.client.modelPortfolio) {
            loadedModel[sector] = parseFloat(this.AppDataComm.state.client.modelPortfolio[sector].toPrecision(4))
        }
        this.distributeSectors(this.CoreService.semiStatic.macroSectors, loadedModel);
    }


    updateTotal(modelPortfolio) {
        let portfolioTotal = 0;
        if (!modelPortfolio) {
            modelPortfolio = this.modelPortfolio;
        }
        for (let sector in modelPortfolio) {
            portfolioTotal += modelPortfolio[sector];
        }
        this.portfolioTotal = portfolioTotal.toPrecision(4);
    }


    setModelPortfolio(value) {
        if (!value) {
            value = this.modelPortfolio;
        }
        this.CoreService.config.settingsActions("modelPortfolio", "set", value);
        //  this.AppDataComm.dispatch("setModelPortfolio", value)
        this.AppDataComm.setModelPortfolio(value)
    }
}
