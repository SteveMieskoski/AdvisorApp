import { Routes, RouterModule }  from "@angular/router";

import { HelpComponent } from "./help.component";
import { ScreenerHelp } from "./screener/screener.component";
import { DataImportHelp } from "./dataImport/dataImport.component";
import { ConfigurationHelp } from "./configuration/configuration.component";

// import { LineMaps } from "./components/lineMaps/lineMaps.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: "",
        component: HelpComponent,
        children: [
            { path: "screenerhelp", component: ScreenerHelp },
            { path: "dataimporthelp", component: DataImportHelp },
            {path: "configurationhelp", component: ConfigurationHelp}
        ]
    }
];


export const routing = RouterModule.forChild(routes);