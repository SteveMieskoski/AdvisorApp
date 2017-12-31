import { Component, OnInit } from "@angular/core";

import { CoreService } from "../../../../core.service";

@Component({
    selector: "logging",
    templateUrl: "./logging.html",
})
export class Logging implements OnInit {


    constructor(private CoreService: CoreService) {
       this.filePath = this.CoreService.config.logPath;
    }

    ngOnInit() {

    }

    saveLogFile(){
    }

}
