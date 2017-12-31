import { Routes, RouterModule }  from "@angular/router";

import { ConfigurationComponent } from "./configuration.component";
import { ModelConfig } from "./components/modelConfig/modelConfig.component";
import { ThresholdValues } from "./components/thresholdValues/thresholdValues.component";
import { Logging } from "./components/logging/logging.component";

// import { LineMaps } from "./components/lineMaps/lineMaps.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: "",
        component: ConfigurationComponent,
        children: [
            { path: "modelconfig", component: ModelConfig },
            { path: "thresholdvalues", component: ThresholdValues },
            {path: "logging", component: Logging}
        ]
    }
];


export const routing = RouterModule.forChild(routes);