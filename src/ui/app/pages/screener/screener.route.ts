
import { Routes, RouterModule }  from "@angular/router";
import { ScreenerComponent } from "./";
import { ScreenBuilder } from "./components/screenBuilder/screenBuilder.component";
import { SavedScreens } from "./components/savedScreens/savedScreens.component";
import { ResultGrid } from "./components/resultGrid/resultGrid.component";



const routes: Routes = [
    {
        path: "",
        component: ScreenerComponent,
        children: [
            { path: "screenBuilder", component: ScreenBuilder },
            { path: "savedScreens", component: SavedScreens },
            { path: "resultGrid", component: ResultGrid }
            //  { path: "linemaps", component: LineMaps }
        ]
    }
];


export const routing = RouterModule.forChild(routes);

