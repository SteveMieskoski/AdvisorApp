import { Component, OnInit } from "@angular/core";
import {ipcRenderer} from "electron";

import { CoreService } from "../../../../core.service";

@Component({
    selector: "databasemanagement",
    templateUrl: "./databaseManagement.html",
})
export class DatabaseManagement implements OnInit {


    constructor(private CoreService: CoreService) {
       this.filePath = this.CoreService.config.logPath;
    }

    ngOnInit() {

    }



}
