import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from "@angular/forms";

import { TooltipModule } from "ngx-bootstrap/tooltip";
import {NgPipesModule} from "ngx-pipes";

import { routing } from "./configuration.route";
import { NgaModule } from "../../theme/nga.module";

import { ObjNgFor, CamelSplit } from "./helpers.pipe";
import { ModelConfig } from "./components/modelConfig/modelConfig.component";
import { ConfigurationComponent } from "./configuration.component";
import { ThresholdValues } from "./components/thresholdValues/thresholdValues.component";
import { ConfigurationService } from "./configuration.service";
import { Logging } from "./components/logging/logging.component";

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
        ConfigurationComponent,
        ModelConfig,
        ThresholdValues,
        ObjNgFor,
        CamelSplit,
        Logging
    ],
    providers: [ConfigurationService],
})
export class ConfigurationModule {
}
