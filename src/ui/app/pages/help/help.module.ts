import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from "@angular/forms";

import { TooltipModule } from "ngx-bootstrap/tooltip";
import {NgPipesModule} from "ngx-pipes";

import { routing } from "./help.route";
import { NgaModule } from "../../theme/nga.module";

import { DataImportHelp } from "./dataImport/dataImport.component";
import { ScreenerHelp } from "./screener/screener.component";
import { HelpComponent } from "./help.component";
import { ConfigurationHelp } from "./configuration/configuration.component";

@NgModule({
    imports: [
        routing,
        CommonModule,
        NgaModule,
        AngularFormsModule,
        ReactiveFormsModule,
        NgPipesModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        HelpComponent,
        ScreenerHelp,
        DataImportHelp,
        ConfigurationHelp
    ],
    providers: [],
})
export class HelpModule {
}
