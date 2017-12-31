import { Injectable } from "@angular/core";
import { CoreService } from "../../core.service";






@Injectable()
export class SavedScreensService {
    public store: object;


    constructor(public CoreService: CoreService) {
        this.CoreService = CoreService;
    }

    loadSaved(screen: object, display: Array<string>, colorResult: boolean) {
        if (!display) {
            display = [];
        }
        return this.CoreService.database.detailedScreen(screen, display, colorResult)
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
}