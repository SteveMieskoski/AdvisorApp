import {Component} from "@angular/core";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Component({
    selector: "rebalancegrid",
    templateUrl: "./rebalanceGrid.html",
})
export class RebalanceGrid {
    private helpText: object;
    private toolPlacement: object;

    constructor(private PagesDataComm: PagesDataComm) {
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }

    ngOnInit() {
    }
}
