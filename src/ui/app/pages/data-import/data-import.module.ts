import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';

import { NgUploaderModule } from 'ngx-uploader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { routing } from './data-import.route';
import { NgaModule } from '../../theme/nga.module';
import { DataImportComponent } from './data-import.component';
import { AccountImport } from './components/accountImport/accountImport.component';
import { IndustryImport } from './components/industryImport/industryImport.component';
import { StocksImport } from './components/stocksImport/stocksImport.component';
import { DataImportDataComm } from './dataImport.dataComm';
import { ReviewDuplicates } from './components/reviewDuplicates/reviewDuplicates.component';
import { ObjNgFor } from './object.pipe';
import { PagesDataComm } from '../pagesDataComm.service';

@NgModule({
    imports: [
        routing,
        CommonModule,
        NgaModule,
        AngularFormsModule,
        NgUploaderModule,
        TooltipModule.forRoot()
    ],
    declarations: [
        DataImportComponent,
        AccountImport,
        IndustryImport,
        StocksImport,
        ReviewDuplicates,
        ObjNgFor
    ],
    entryComponents: [],
    providers: [DataImportDataComm],
})
export class DataImportModule {
}
