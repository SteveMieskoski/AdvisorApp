import { Routes, RouterModule } from "@angular/router";
import { Pages } from "./pages.component";
import { ModuleWithProviders } from "@angular/core";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
    /* {
       path: "login",
       loadChildren: "./login/login.module#LoginModule"
     },
     {
       path: "register",
       loadChildren: "./register/register.module#RegisterModule"
     },*/
    {
        path: "pages",
        component: Pages,
        children: [
            {path: "", redirectTo: "dashboard", pathMatch: "full"},
            {path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule"},
            // { path: "editors", loadChildren: "./editors/editors.module#EditorsModule" },
           // {path: "components", loadChildren: "./components/components.module#ComponentsModule"},
            {path: "charts", loadChildren: "./charts/charts.module#ChartsModule"},
           // {path: "ui", loadChildren: "./ui/ui.module#UiModule"},
           // {path: "forms", loadChildren: "./forms/forms.module#FormsModule"},
           // {path: "tables", loadChildren: "./tables/tables.module#TablesModule"},
            { path: "configuration", loadChildren: "./configuration/configuration.module#ConfigurationModule" },
            {path: "screener", loadChildren: "./screener/screener.module#ScreenerModule"},
            { path: "rebalancer", loadChildren: "./rebalancer/rebalancer.module#RebalancerModule"},
            {path: "dataimport", loadChildren: "./data-import/data-import.module#DataImportModule"},
            {path: "help", loadChildren: "./help/help.module#HelpModule"}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
