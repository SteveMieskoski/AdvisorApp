import { Component, OnInit } from '@angular/core';
import 'style-loader!./reviewDuplicates.scss';
import { CoreService } from '../../../../core.service';
import { DataImportDataComm } from '../../dataImport.dataComm';
import { PagesDataComm } from '../../../pagesDataComm.service';


@Component({
    selector: 'reviewDuplicates',
    templateUrl: './reviewDuplicates.html'
})
export class ReviewDuplicates implements OnInit {
    private updateValues: object;
    private duplicateData: object;
    private helpText: object;
    private toolPlacement: object;

    constructor(public CoreService: CoreService, public DataComm: DataImportDataComm, private PagesDataComm: PagesDataComm) {
        this.CoreService = CoreService;
        this.DataComm = DataComm;
        this.updateValues = {};
        this.duplicateData = {};
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }


    ngOnInit() {
        let rawData = this.DataComm.data;
        for (let i = 0; i < rawData.length; i++) {
            this.duplicateData[rawData[i].symbol] = rawData[i].items;
        }
        console.log(this.duplicateData);

    }

    addToUpdateList(key, index) {
        console.log(key, index);
        this.updateValues[key] = this.duplicateData[key]
    }

    ok() {
        this.CoreService.dataImport.stocksUpdateDuplicates(this.updateValues)
            .then(response => {
                console.log('update duplicates response', response);
            })
        console.log(this.duplicateData);
    }

    checkUpateValues() {
        console.log(this.updateValues);
    }


}
