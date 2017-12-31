import {remote} from "electron";

import { Injectable } from "@angular/core";


@Injectable()
export class CoreService {
    public coreExports: any;
    public uiExports: any;
    public dataImport: any;
    public queries: any;
    public calc: any;
    public semiStatic: any;
    public uiRelated: any;
    public config: any;
    public database: any;

    constructor() {
        this.coreExports = remote.require("./core/coreExports");
        this.uiExports = remote.require("./core/uiExports");
        this.database = this.coreExports.database;
      //  this.dataImport = this.coreExports.database;
      //  this.queries = this.coreExports.database;
        this.calc = this.coreExports.calc;
        this.semiStatic = this.coreExports.staticFiles;
        this.uiRelated = this.uiExports.uiRelated;
        this.config = this.coreExports.config;
    }


}
