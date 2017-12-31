import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import _ from 'lodash';
/*
import '../../node_modules/ag-grid/dist/styles/ag-grid.css'
import '../..//node_modules/ag-grid/dist/styles/theme-fresh.css'
*/
import 'style-loader!./baseStyles.scss';
import { CoreService } from '../../../../core.service';
import { ScreenerDataComm } from '../../screener.dataComm';
import { ResultGridService } from '../../resultGrid.service';


@Component({
    selector: 'resultGrid',
    templateUrl: './resultGrid.html',
    providers: [ResultGridService]
})
export class ResultGrid implements OnInit {
    public gridOptions: GridOptions;
    private rowData: any[];
    private columnDefs: any[];
    private showGrid: boolean;
    private AltGridService: any;
    private gridData: any[];
    private noData: boolean;
    private columns: any;

    constructor(public CoreService: CoreService, public DataComm: ScreenerDataComm, private gridService: ResultGridService) {
        this.CoreService = CoreService;
        this.DataComm = DataComm;
        this.AltGridService = gridService;
        this.showGrid = false;
        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit();
            }
        };


        /* this.columnDefs = [
             {headerName: 'Make', field: 'make'},
             {headerName: 'Model', field: 'model'},
             {headerName: 'Price', field: 'price'}
         ];
         this.rowData = [
             {make: 'Toyota', model: 'Celica', price: 35000},
             {make: 'Ford', model: 'Mondeo', price: 32000},
             {make: 'Porsche', model: 'Boxter', price: 72000}
         ];*/
    }


    ngOnInit() {

        if (_.size(this.DataComm.displayData) > 0) {
            // this.gridData = this.DataComm.displayData;
            this.noData = false;
            console.log(this.DataComm.displayData);
            this.setup(this.DataComm.displayData);
        } else {
            console.log('ELSE');
        }
    }

    selectAllRows() {
    }

    /**
     * =======================  SETUP METHODS ===============================
     */
    dataCheck() {
        console.log(this.DataComm.displayData);
        console.log(this.rowData);
    }

    setup(data) {
        // console.log('this.gridData', this.gridData);


        // let columnUnique = this.buildSelectLists(data);
        this.columnDefs = this.simpleGridPrep(this.DataComm.displayData[0]);
        this.rowData = this.DataComm.displayData;
        this.showGrid = true;
        /*
                this.prepareGridColumns(columnUnique)
                      .then((columnResponse) => {
                          this.columns = columnResponse;
                          // this.gridOptions.columnDefs = columnResponse;
                          this.rowData = data;
                          this.columnDefs = this.columns;
                          this.gridOptions.api.setColumnDefs(columnResponse);
                          this.gridOptions.api.setRowData(this.DataComm.displayData);
                          this.gridProperties = {
                            //  rowData: this.DataComm.displayData,
                            //  columnDefs: this.columns,
                            //   rowSelection: 'multiple',
                            //   enableColResize: true,
                            //   rowHeight: 22,
                            //   enableSorting: true,
                            //   enableFilter: true,
                          }
                          this.showGrid = true;
                      })
                      .catch((error) => {
                          console.log('prepare columns error', error);
                      });
        */
    }

    simpleGridPrep(data) {
        let columns = [];
        // use a single item out of the returned data array;
        for (let prop of data) {
            columns.push({headerName: prop, field: prop})
        }
        return columns;
    }


    gridSetup(columns) {
        return {
            rowData: this.DataComm.displayData,
            columnDefs: columns
        };
    }

    prepareGridColumns(options) {
        //   console.log(options);
        let columns = Object.keys(options);
        let setupColumns = [];
        /*  let selectCol = Promise.resolve({
              headerName: '', width: 30, checkboxSelection: true, suppressSorting: true,
              suppressMenu: true, pinned: true
          });
          setupColumns.push(selectCol);*/
        for (let i = 0; i < columns.length; i++) {
            setupColumns.push(this.AltGridService.columns(columns[i], options[columns[i]], this.DataComm.colorResults))
        }
        return Promise.all(setupColumns);
    }


    buildSelectLists(results) {
        let columns = {};
        if (results) {
            //  console.log('SELECT LIST CREATE (WAS THROWING AN ERROR BEFORE)', results);
            let keys = Object.keys(results[0]);
            for (let j = 0; j < keys.length; j++) {
                let noDisplay = ['_id', '__v', '_kind', 'created_at', 'updated_at', 'uid', 'Primary', 'alias'];
                if (noDisplay.indexOf(keys[j]) === -1) {
                    columns[keys[j]] = _.map(results, keys[j]);
                }
            }
            let noUniq = ['company', 'symbol'];
            let valueColumns = {};
            let tmp = [];
            for (let prop in columns) {
                if (_.has(columns[prop], 'value')) {
                    // not catching what's its supposed to.  re-initiated right below the else statement
                    if (noUniq.indexOf(prop) === -1) {
                        console.log('1', _.uniqBy(columns[prop], _.property('value')));
                        valueColumns[prop] = _.map(_.uniqBy(columns[prop], _.property('value')), _.property('value'));
                        //  tmp = _.uniqBy(columns[prop], 'value');
                        //  valueColumns[prop] = _.map(tmp, 'value');
                    } else {
                        console.log('2', _.uniqBy(columns[prop], _.property('value')));
                        valueColumns[prop] = columns[prop];
                    }
                } else {
                    if (noUniq.indexOf(prop) === -1) {
                        if (_.has(_.sample(columns[prop]), 'value')) {
                            //     console.log('3',_.uniqBy(columns[prop], _.property('value')));
                            valueColumns[prop] = _.map(_.uniqBy(columns[prop], _.property('value')), _.property('value'));
                        } else {
                            valueColumns[prop] = _.uniq(columns[prop]);
                        }
                    } else {
                        //   console.log('4', _.uniqBy(columns[prop], _.property('value')));
                        valueColumns[prop] = columns[prop];
                    }
                }
            }
            let selectCollections = {};
            for (let prop of valueColumns) {
                selectCollections[prop] = [];
                _.forEach(valueColumns[prop], (value) => {
                    selectCollections[prop].push({label: value, value: value})
                })
            }
            return selectCollections;
        }

    }

}
