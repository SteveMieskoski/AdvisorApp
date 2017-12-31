import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer, OnInit, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CoreService } from "../../../../core.service";
import { ParseSpreadSheetsService } from "../../parseSpreadSheets.service";
import { DataImportDataComm } from "../../dataImport.dataComm";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Injectable()
export class Positions {
    public helpText: any;
    public toolPlacement: any;
    public currentData: any;
    public totalValue: number;
    public db: any;
    public expandedData: any;

    constructor(public CoreService: CoreService, private router: Router, private r: ActivatedRoute,
                private PagesDataComm: PagesDataComm, private renderer: Renderer) {
        this.CoreService = CoreService;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
        this.expandedData = {};
    }

    setCurrentData(currentData) {
        return new Promise((resolve, reject) => {
            this.currentData = currentData;
            this.calcPortfolioTotal()
                .then(() => {
                    this.calcPositionPercents();
                    this.getDetailsForPositions()
                        .then(() => {
                            this.determinePositionOpinion();
                            resolve();
                        })
                })
        })
    }

    calcPortfolioTotal() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.currentData.length; i++) {
                this.totalValue += this.currentData[i].quantity * this.currentData[i].marketPrice;
            }
            resolve();
        })
    };

    calcPositionPercents() {
        for (let i = 0; i < this.currentData.length; i++) {
            this.currentData[i].percentTotal = (this.currentData[i].quantity * this.currentData[i].marketPrice) / this.totalValue;
        }
    }

    getDetailsForPositions() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.currentData.length; i++) {
                this.CoreService.database.bySymbol(this.currentData[i].symbol)
                    .then((result) => {
                        this.expandedData[this.currentData[i].symbol] = result;
                    })
            }
            resolve();
        })
    }


    determinePositionOpinion() {
        for (let i = 0; i < this.currentData.length; i++) {
            let checkOne = this.expandedData[this.currentData[i].symbol].greenPercent > this.expandedData[this.currentData[i].symbol].redPercent;
            let checkTwo = this.expandedData[this.currentData[i].symbol].greenPercent > this.expandedData[this.currentData[i].symbol].yellowPercent;
            let checkThree = this.expandedData[this.currentData[i].symbol].yellowPercent > this.expandedData[this.currentData[i].symbol].redPercent;
            let checkFour = this.expandedData[this.currentData[i].symbol].yellowPercent > this.expandedData[this.currentData[i].symbol].greenPercent;
            let checkFive = this.expandedData[this.currentData[i].symbol].redPercent > this.expandedData[this.currentData[i].symbol].greenPercent;
            let checkSix = this.expandedData[this.currentData[i].symbol].redPercent > this.expandedData[this.currentData[i].symbol].yellowPercent;
            if (checkOne && checkTwo) {
                this.currentData[i].OpinionState = "positive";
            } else if (checkThree && checkFour) {
                this.currentData[i].OpinionState = "neutral";
            } else if (checkFive && checkSix) {
                this.currentData[i].OpinionState = "negative";
            } else if (checkOne && checkThree) {
                this.currentData[i].OpinionState = "positive - neutral";
            } else if (checkFive || checkSix) {
                this.currentData[i].OpinionState = "neutral - negative";
            }
        }
    }


}