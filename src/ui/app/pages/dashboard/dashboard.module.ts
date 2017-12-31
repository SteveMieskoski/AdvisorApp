import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppTranslationModule } from "../../app.translation.module";
import { NgaModule } from "../../theme/nga.module";

import { Dashboard } from "./dashboard.component";
import { routing } from "./dashboard.routing";

import { Todo } from "./todo";
import { Calendar } from "./calendar";
import { CalendarService } from "./calendar/calendar.service";
import { TodoService } from "./todo/todo.service";
import { DashSavedScreens } from "./dashboardSavedScreens/dashSavedScreens.component";
import { DashSavedScreensService } from "./dashboardSavedScreens/dashSavedScreens.service";
import { ObjNgFor } from "./helpers.pipe";
import { PagesDataComm } from "../pagesDataComm.service";
import { TooltipModule } from "ngx-bootstrap/tooltip";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppTranslationModule,
        NgaModule,
        routing,
        TooltipModule.forRoot()
    ],
    declarations: [
        Todo,
        Calendar,
        DashSavedScreens,
        Dashboard,
        ObjNgFor
    ],
    providers: [
        CalendarService,
        TodoService,
        DashSavedScreensService
    ]
})
export class DashboardModule {
}
