import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgGridModule } from "ag-grid-angular/main";
import { SelectModule } from "ng2-select";

import { TooltipModule } from "ngx-bootstrap/tooltip";

import { NgaModule } from "../../theme/nga.module";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";


import { ScreenerComponent } from "./screener.component";
import { routing } from "./screener.route";
import { ScreenBuilder } from "./components/screenBuilder/screenBuilder.component";
import { ResultGrid } from "./components/resultGrid/resultGrid.component";
import { SavedScreens } from "./components/savedScreens/savedScreens.component";
import { ScreenerDataComm } from "./screener.dataComm";
import { ObjNgFor } from "./object.pipe";
import { PagesDataComm } from "../pagesDataComm.service";

@NgModule({
    imports: [
        routing,
        CommonModule,
        FormsModule,
        NgaModule,
        NgbModule,
        SelectModule,
        TypeaheadModule,
        TooltipModule.forRoot(),
        AgGridModule.withComponents([])
    ],
    declarations: [
        ScreenerComponent,
        ScreenBuilder,
        ResultGrid,
        SavedScreens,
        ObjNgFor
    ],
    entryComponents: [],
    providers: [ScreenerDataComm],
})
export class ScreenerModule {
}
