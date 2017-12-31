import { Injectable } from "@angular/core";

@Injectable()
export class RebalancerDataComm {
    public data: object;
    public activeAccount: object;
    public accountPositions: any;

    constructor() {
        this.data = {};
        this.activeAccount = {};
        this.accountPositions = [];
    }


    setData(data) {
        this.data = data;
    }

    setActiveAccount(account) {
        this.activeAccount = account;
    }

    setAccountPositions(positions) {
        this.accountPositions = positions;
    }

    getAccountPositions() {
        return this.accountPositions;
    }

    getActiveAccount() {
        return this.activeAccount;
    }

    clearActiveAccount() {
        this.activeAccount = {};
    }

}