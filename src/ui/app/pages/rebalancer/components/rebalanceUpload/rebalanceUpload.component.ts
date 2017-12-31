import {Component} from "@angular/core";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Component({
    selector: "rebalanceupload",
    templateUrl: "./rebalanceUpload.html",
})
export class RebalanceUpload {
    private helpText: object;
    private toolPlacement: object;

    constructor(private PagesDataComm: PagesDataComm) {
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }

    ngOnInit() {
    }
}
