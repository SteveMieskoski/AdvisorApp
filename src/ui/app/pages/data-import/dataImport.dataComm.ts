import { Injectable } from '@angular/core';

@Injectable()
export class DataImportDataComm {
    public data: object;
    constructor() {
        this.data = {};
    }


    setData(data){
        this.data = data;
    }

}