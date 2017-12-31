import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { TooltipModule } from "ngx-bootstrap/tooltip";

import { routing } from "./rebalancer.route";
import { NgaModule } from "../../theme/nga.module";

import { RebalancerComponent } from "./rebalancer.component";
import { RebalanceGrid } from "./components/rebalanceGrid/rebalanceGrid.component";
import { RebalanceUpload } from "./components/rebalanceUpload/rebalanceUpload.component";
import { AccountView } from "./components/accountView/accountView.component";
import { PagesDataComm } from "../pagesDataComm.service";


@NgModule({
    imports: [
        routing,
        CommonModule,
        NgaModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        RebalancerComponent,
        RebalanceGrid,
        RebalanceUpload,
        AccountView
    ],
    entryComponents: [],
    providers: [],
})
export class RebalancerModule {
}
