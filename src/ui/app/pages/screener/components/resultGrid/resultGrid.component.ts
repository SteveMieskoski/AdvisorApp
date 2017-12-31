import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid/main";
import _ from "lodash";

import "style-loader!./baseStyles.scss";
import { CoreService } from "../../../../core.service";
import { ScreenerDataComm } from "../../screener.dataComm";
import { ResultGridService } from "../../resultGrid.service";
import { UniqueEntriesBuild } from "./uniqueEntriesBuild.service";
import { PagesDataComm } from "../../../pagesDataComm.service";


@Component({
    selector: "resultGrid",
    templateUrl: "./resultGrid.html",
    providers: [ResultGridService]
})
export class ResultGrid implements OnInit {
    private helpText: object;
    private toolPlacement: object;
    public gridOptions: GridOptions;
    public rowData: any[];
    public columnDefs: any[];
    public showGrid: boolean;
    public AltGridService: any;
    public gridData: any[];
    public displayOptions: boolean;
    public columns: any;

    constructor(public CoreService: CoreService, public DataComm: ScreenerDataComm, private gridService: ResultGridService, private PagesDataComm: PagesDataComm) {
        this.CoreService = CoreService;
        this.DataComm = DataComm;
        this.PagesDataComm = PagesDataComm;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;

        this.AltGridService = gridService;
        this.screenLabel = "";
        this.showGrid = false;
        this.displayOptions = false;

        this.gridOptions = <GridOptions>{
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            pagination: true,
            rowHeight: 22,
            rowSelection: "multiple",
            context: {
                componentParent: this
            },
            onGridReady: () => {
                this.gridOptions.api.setRowData(this.initialData);
                this.gridOptions.api.setColumnDefs(this.initialColumns);
            }
        };
    }

    ngOnInit() {
        if (this.DataComm.displayData.length > 0) {
            this.displayOptions = true;
            this.setupGrid(this.DataComm.displayData);
        } else if (this.PagesDataComm.displayData.length > 0) {
            this.displayOptions = true;
            console.log("pages data comm display data", this.PagesDataComm.displayData);
            this.setupGrid(this.PagesDataComm.displayData);
            // this.gridOptions.api.showNoRowsOverlay()
        } else {
            console.log("pages data comm display data", this.PagesDataComm.displayData);

        }
    }

    setupGrid(dataToDisplay) {
        this.initialData = _.clone(dataToDisplay);
        let buildSelectList = new UniqueEntriesBuild();
        buildSelectList.build(this.initialData)
            .then((response) => {
                this.selectLists = response.selectLists;
                this.columnFields = response.fields;
                // this.initialColumns = this.defineColumns(this.columnFields);
                this.defineColumns(this.columnFields)
                    .then((response) => {
                        this.initialColumns = response;
                        this.gridOptions.api.setRowData(this.initialData);
                        this.gridOptions.api.setColumnDefs(this.initialColumns);
                        console.log("this.initialColumns", this.initialColumns);
                        window.setTimeout(() => {
                            //  this.gridOptions.api.sizeColumnsToFit();
                        }, 750)
                    })
                    .catch((error) => {
                        throw error;
                    });
            })
            .catch((error) => {
                throw error;
            });
    }

    defineColumns(colData) {
        let columns = [];
        for (let i = 0; i < colData.length; i++) {
            columns.push(this.AltGridService.columns(colData[i], this.DataComm.colorResults))
        }
        return Promise.all(columns)
        /* for (let i = 0; i < colData.length; i++) {
             this.noUniq = ["company", "symbol"];
             columns.push({headerName: colData[i], field: colData[i]})
         }
         return columns;*/
    }

    updateData() {
        console.log("DATA", this.initialData);
        console.log("COLUMN DEFS", this.initialColumns);
        this.gridOptions.api.setRowData(this.initialData);
        this.gridOptions.api.setColumnDefs(this.initialColumns);
    }


    dataCheck() {
        console.log("DATA", this.initialData);
        console.log("COLUMN DEFS", this.initialColumns);
        this.gridOptions.api.setRowData(this.initialData);
        this.gridOptions.api.setColumnDefs(this.initialColumns);
    }


    saveLastScreen() {
        this.DataComm.saveWholeScreen(this.screenLabel);
    }


}