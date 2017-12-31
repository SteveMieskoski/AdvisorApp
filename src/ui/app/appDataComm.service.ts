import { Injectable } from "@angular/core";


@Injectable()
export class AppDataComm {
    public state: any;

    constructor() {
        this.state = {};
        this.state.client = {};
    }

    setModelPortfolio(value) {
        this.state.client.modelPortfolio = value;
    }

    dispatch(action, value) {

    }


}
