import { NgModule }      from "@angular/core";
import { CommonModule }  from "@angular/common";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { routing }       from "./pages.routing";
import { NgaModule } from "../theme/nga.module";
import { AppTranslationModule } from "../app.translation.module";

import { Pages } from "./pages.component";
import { PagesDataComm } from "./pagesDataComm.service";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
    providers: [PagesDataComm]
})
export class PagesModule {
}
