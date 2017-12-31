import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer, OnInit } from "@angular/core";
import { NgUploaderOptions } from "ngx-uploader";
import XLSX from "xlsx"
import _ from "lodash";

import "style-loader!./stocksImport.scss";
import { CoreService } from "../../../../core.service";
import { ParseSpreadSheetsService } from "../../parseSpreadSheets.service";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Component({
    selector: "industryimport",
    templateUrl: "./industryImport.html",
    providers: [ParseSpreadSheetsService]
})
export class IndustryImport implements OnInit {
    private helpText: object;
    private toolPlacement: object;
    private importActive = false;
    private importTimeRemaining: number;
    private importLength: number;
    private timerDisplayMinutes: number;
    private timerDisplaySeconds: number;
    public files: Array<any>;
    public SheetJSFT: any;
    public canUpload = {
        initial: false,
        update: false
    };
    private showPreparingfile = {
        initial: false,
        update: false
    };
    private fileActionMessage: string;
    private sheetsContained: Array<any>;
    // public coreService: any;
    // public parseSpreadSheet: any;


    @Input() fileUploaderOptions: NgUploaderOptions = {url: ""};
    @Output() onFileUpload = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    @Input() defaultValue: string = "";

    /* @ViewChild("fileUpload") public _fileUpload: ElementRef;
     @ViewChild("inputText") public _inputText: ElementRef;*/
    @ViewChild("fileUploadInitial") public _fileUploadInitial: ElementRef;
    @ViewChild("fileUploadUpdate") public _fileUploadUpdate: ElementRef;
    @ViewChild("inputTextInitial") public _inputTextInitial: ElementRef;
    @ViewChild("inputTextUpdate") public _inputTextUpdate: ElementRef;

    public uploadFileInProgress: boolean;

    constructor(public CoreService: CoreService, public ParseSpreadSheet: ParseSpreadSheetsService,
                private PagesDataComm: PagesDataComm, private renderer: Renderer) {
        this.files = [];
        this.CoreService = CoreService;
        this.ParseSpreadSheet = ParseSpreadSheet;
        this.timerDisplaySeconds = 0;
        this.timerDisplayMinutes = 0;
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }


    ngOnInit() {
        this.SheetJSFT = [
            "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
        ].map(function (x) {
            return "." + x;
        }).join(",");
    }


    bringFileSelector(uploadType): boolean {
        if (uploadType === "initial") {
            this.renderer.invokeElementMethod(this._fileUploadInitial.nativeElement, "click");
        } else if (uploadType === "update") {
            this.renderer.invokeElementMethod(this._fileUploadUpdate.nativeElement, "click");
        }
        return false;
    }

    beforeFileUpload(event, uploadType): void {
        this.showPreparingfile[uploadType] = true;
        this.fileActionMessage = "Preparing file.  Please Wait.";
        console.log(arguments);
        if (uploadType === "initial") {
            this.showPreparingfile["update"] = false;
            this.canUpload["update"] = false;
        } else if (uploadType === "update") {
            this.showPreparingfile["initial"] = false;
            this.canUpload["initial"] = false;
        }
        let files = event.target.files;
        if (files.length > 0) {
            this.files = files;
            console.log(files);
            this._onChangeFileSelect(files[0], uploadType);
            this.canUpload[uploadType] = !this.canUpload[uploadType];
            this.runUploadFile(uploadType);
        }
    }

    runUploadFile(uploadType) {
        if (this.files.length > 0) {
            this.uploadFileInProgress = true;
            this.ParseSpreadSheet.parseIndustryGroupsBW(this.files[0])
                .then((ws) => {
                    this.canUpload[uploadType] = true;
                    this.showPreparingfile[uploadType] = false;
                    this.sheetsContained = ws;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    createFromSelectedSheet(sheetIndex, sheetContent, uploadType) {
        this.showPreparingfile[uploadType] = true;
        this.fileActionMessage = "Importing Sheet Contents From " + this.sheetsContained[sheetIndex].name;
        this.canUpload[uploadType] = !this.canUpload[uploadType];
        this.importLength = _.size(sheetContent);
        this.importTimeRemaining = (Math.ceil(this.importLength / 50) * 100);
        this.importActive = true;
        this.importTimer(this.importTimeRemaining);
        this.CoreService.database.industryGroupsImport(sheetContent)
            .then((response) => {
                this.showPreparingfile[uploadType] = false;
                this.uploadFileInProgress = false;
                this.importActive = false;

                this.sheetsContained.splice(sheetIndex, 1);
                new Notification("Advisor", {
                    body: "Industry Upload Complete"
                });
            }).catch(error => {
            console.error(error);
        });
    }

    updateFromSelectedSheet(sheetIndex, sheetContent, uploadType) {
        this.showPreparingfile[uploadType] = true;
        this.fileActionMessage = "Importing Sheet Contents.";
        this.canUpload[uploadType] = !this.canUpload[uploadType];
        this.importLength = _.size(sheetContent);
        this.importTimeRemaining = (Math.ceil(this.importLength / 50) * 100);
        this.importActive = true;
        this.importTimer(this.importTimeRemaining);
        this.CoreService.database.industryGroupsUpdate(sheetContent)
            .then((response) => {
                this.showPreparingfile[uploadType] = false;
                this.uploadFileInProgress = false;
                this.importActive = false;
                this.sheetsContained.splice(sheetIndex, 1);
                if (this.sheetsContained.length > 0) {
                    this.canUpload[uploadType] = true;
                }
                new Notification("Advisor", {
                    body: "Industry Upload Complete"
                });
            }).catch(error => {
            console.error(error);
        });
    }

    importTimer(time) {
        window.setTimeout((timer) => {
            if (timer >= 1000) {
                timer -= 1000;
                this.timerDisplaySeconds = Math.ceil((timer % 60000) / 1000);
                this.timerDisplayMinutes = Math.floor(timer / 60000);
                this.importTimer(timer);
            } else {
                this.importActive = false;
            }
        }, 1000, time)
    }

    _onChangeFileSelect(file, uploadType) {
        if (uploadType === "initial") {
            this._inputTextInitial.nativeElement.value = file.name;
        } else {
            this._inputTextUpdate.nativeElement.value = file.name;
        }
    }

    _onFileUpload(data): void {
        if (data["done"] || data["abort"] || data["error"]
        ) {
            this._onFileUploadCompleted(data);
        }
        else {
            this.onFileUpload.emit(data);
        }
    }

    _onFileUploadCompleted(data): void {
        this.uploadFileInProgress = false;
        this.onFileUploadCompleted.emit(data);
    }

}

