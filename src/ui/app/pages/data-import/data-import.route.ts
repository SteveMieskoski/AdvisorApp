import { Routes, RouterModule }  from '@angular/router';

import { DataImportComponent } from './';
 import { AccountImport } from './components/accountImport/accountImport.component';
 import { IndustryImport } from './components/industryImport/industryImport.component';
 import { StocksImport } from './components/stocksImport/stocksImport.component';
import { ReviewDuplicates } from './components/reviewDuplicates/reviewDuplicates.component';
// import { LineMaps } from './components/lineMaps/lineMaps.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: DataImportComponent,
        children: [
            { path: 'accountimport', component: AccountImport },
            { path: 'indusrtyimport', component: IndustryImport },
            { path: 'stocksimport', component: StocksImport },
            { path: 'reviewDuplicates', component: ReviewDuplicates }
        ]
    }
];


export const routing = RouterModule.forChild(routes);