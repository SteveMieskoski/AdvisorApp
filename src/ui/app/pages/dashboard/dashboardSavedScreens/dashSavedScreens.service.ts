import { Injectable } from "@angular/core";
import { CoreService } from "../../../core.service";

@Injectable()
export class DashSavedScreensService {
    private _todoList = [
        {text: "Check me out"},
        {text: "Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro"},
        {text: "Ex has semper alterum, expetenda dignissim"},
        {text: "Vim an eius ocurreret abhorreant, id nam aeque persius ornatus."},
        {text: "Simul erroribus ad usu"},
        {text: "Ei cum solet appareat, ex est graeci mediocritatem"},
        {text: "Get in touch with akveo team"},
        {text: "Write email to business cat"},
        {text: "Have fun with blur admin"},
        {text: "What do you think?"},
    ];
    public store: object;


    constructor(public CoreService: CoreService) {
        this.CoreService = CoreService;
    }

    getSavedList() {
        return this.CoreService.config.savedScreens.store
    }

    loadSaved(screen: object, display: Array<string>, colorResult: boolean) {
        if (!display) {
            display = [];
        }
        return this.CoreService.queries.detailedScreen(screen, display, colorResult)
    }

    deleteSaved(key: string) {
        return new Promise((resolve, reject) => {
            this.CoreService.config.savedScreens.delete(key);
            resolve();
        })
    }

    deleteAllSaved() {
        return new Promise((resolve, reject) => {
            this.CoreService.config.savedScreens.clear();
            resolve();
        })

    }


    getTodoList() {
        return this._todoList;
    }
}
