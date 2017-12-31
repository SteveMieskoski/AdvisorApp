
import { Routes, RouterModule }  from "@angular/router";

import { RebalancerComponent } from "./";

import { RebalanceUpload } from "./components/rebalanceUpload/rebalanceUpload.component";
import { RebalanceGrid } from "./components/rebalanceGrid/rebalanceGrid.component";
import { AccountView } from "./components/accountView/accountView.component";
import { Rebalance } from "./components/rebalance/rebalance.component";

// noinspection TypeScriptValidateTypes
// ;
const routes: Routes = [
    {
        path: "",
        component: RebalancerComponent,
        children: [
            { path: "rebalancerupload", component: RebalanceUpload },
            { path: "rebalancergrid", component: RebalanceGrid },
            {path: "accountview", component: AccountView},
            {path: "rebalance" , component: Rebalance}
        ]
    }
];


export const routing = RouterModule.forChild(routes);

