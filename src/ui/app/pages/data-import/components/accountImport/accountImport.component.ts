import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgUploaderOptions } from "ngx-uploader";
import XLSX from "xlsx"

import "style-loader!./accountImport.scss";
import { CoreService } from "../../../../core.service";
import { ParseSpreadSheetsService } from "../../parseSpreadSheets.service";
import { DataImportDataComm } from "../../dataImport.dataComm";
import { PagesDataComm } from "../../../pagesDataComm.service";

@Component({
    selector: "accountimport",
    templateUrl: "./accountImport.html",
    providers: [ParseSpreadSheetsService]
})
export class AccountImport implements OnInit {
    private helpText: object;
    private toolPlacement: object;
    private importActive = {
        initial: false,
        update: false
    };
    private showPreparingfile = {
        initial: false,
        update: false
    };
    private fileActionMessage: string;
    private timerDisplayMinutes: number;
    private timerDisplaySeconds: number;
    private importLength: number;
    private accountListing: Array<any>;
    private positionListing: Array<any>;
    private showCreateAccount: boolean = false;
    public files: Array<any>;
    public SheetJSFT: any;
    public sheetsContained: Array<any>;
    public canUpload = {
        initial: false,
        update: false
    };

    @Input() fileUploaderOptions: NgUploaderOptions = {url: ""};
    @Output() onFileUpload = new EventEmitter<any>();
    @Output() onFileUploadCompleted = new EventEmitter<any>();
    @Input() defaultValue = "";

    @ViewChild("fileUploadInitial") public _fileUploadInitial: ElementRef;
    @ViewChild("fileUploadUpdate") public _fileUploadUpdate: ElementRef;
    @ViewChild("inputTextInitial") public _inputTextInitial: ElementRef;
    @ViewChild("inputTextUpdate") public _inputTextUpdate: ElementRef;
    @ViewChild("identifierText") public _identifierText: ElementRef;
    private accountUid: any;
    @ViewChild("identifierTextUpdate") public _identifierTextUpdate: ElementRef;
    @ViewChild("createAccountInputOne") public _createAccountInputOne: ElementRef;
    @ViewChild("createAccountInputTwo") public _createAccountInputTwo: ElementRef;
    @ViewChild("createAccountIdentifier") public _createAccountIdentifier: ElementRef;

    public uploadFileInProgress: boolean;

    constructor(public CoreService: CoreService, public ParseSpreadSheet: ParseSpreadSheetsService,
                public DataComm: DataImportDataComm, private router: Router, private r: ActivatedRoute,
                private PagesDataComm: PagesDataComm, private renderer: Renderer) {
        this.files = [];
        this.timerDisplaySeconds = 0;
        this.timerDisplayMinutes = 0;
        this.CoreService = CoreService;
        this.ParseSpreadSheet = ParseSpreadSheet;
        this.DataComm = DataComm;
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
        console.log(arguments);
        //  console.log(this._fileUploadInitial.nativeElement.files[0]);
        this.showPreparingfile[uploadType] = true;
        this.fileActionMessage = "Preparing file.  Please Wait.";
        let files;
        if (uploadType === "initial") {
            this.showPreparingfile["update"] = false;
            this.canUpload["update"] = false;
            files = event.target.files;
            console.log(files);
        } else if (uploadType === "update") {
            this.showPreparingfile["initial"] = false;
            this.canUpload["initial"] = false;
            files = event.target.files;
        } else {
            files = [];
        }
        if (files.length > 0) {
            this.files = files;
            console.log(files);
            this._onChangeFileSelect(files[0], uploadType);
            this.canUpload[uploadType] = !this.canUpload[uploadType];
            this.runUploadFile(uploadType)
        }
    }

    runUploadFile(uploadType) {
        if (this.files.length > 0) {
            this.uploadFileInProgress = true;
            this.ParseSpreadSheet.parseWorkbook(this.files[0])
                .then((ws) => {
                    this.canUpload[uploadType] = true;
                    console.log(ws);
                    this.showPreparingfile[uploadType] = false;
                    this.sheetsContained = ws;
                })
        }
    }

    createFromSelectedSheet(sheetIndex, sheetContent, uploadType) {
        this.showPreparingfile[uploadType] = true;
        this.canUpload[uploadType] = false;
        this.fileActionMessage = "Importing Sheet Contents From " + this.sheetsContained[sheetIndex].name;
        var output = XLSX.utils.sheet_to_json(sheetContent);
        console.log(output);
        this.importLength = output.length;
        let importTimeRemaining = (Math.ceil(this.importLength / 1000) * 100);
        this.importActive[uploadType] = true;
        this.importTimer(importTimeRemaining, uploadType);
        let identifier = this._identifierText.nativeElement.value;
        console.log(identifier);
        this.CoreService.database.accountImport(output, identifier)
            .then((response) => {
                this.showPreparingfile[uploadType] = false;
                this.uploadFileInProgress = false;
                this.importActive[uploadType] = false;
                this.sheetsContained.splice(sheetIndex, 1);
                if (this.sheetsContained.length > 0) {
                    this.canUpload[uploadType] = true;
                }
                new Notification("Advisor", {
                    body: "Stock Data Import Complete"
                });
                console.log("stocksdata update upload response", response);
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateFromSelectedSheet(sheetIndex, sheetContent) {
        this.showPreparingfile["update"] = true;
        this.canUpload["update"] = false;
        this.fileActionMessage = "Importing Sheet Contents From " + this.sheetsContained[sheetIndex].name;
        var output = XLSX.utils.sheet_to_json(sheetContent);
        console.log(output);
        this.importLength = output.length;
        let importTimeRemaining = (Math.ceil(this.importLength / 1000) * 100);
        this.importActive["update"] = true;
        this.importTimer(importTimeRemaining, "update");
        let identifier = this._identifierTextUpdate.nativeElement.value;
        console.log(identifier);
        this.CoreService.database.accountUpdate(output, identifier)
            .then((response) => {
                this.showPreparingfile["update"] = false;
                this.uploadFileInProgress = false;
                this.importActive["update"] = false;
                this.sheetsContained.splice(sheetIndex, 1);
                if (this.sheetsContained.length > 0) {
                    this.canUpload["update"] = true;
                }
                new Notification("Advisor", {
                    body: "Stock Data Update Complete"
                });
                console.log("stocksdata update upload response", response);
            })
            .catch(error => {
                console.error(error);
                this.showPreparingfile["update"] = false;
                this.uploadFileInProgress = false;
                this.importActive["update"] = false;
                this.canUpload["update"] = true;
            });
    }

    getAllAccounts() {
        this.CoreService.database.getAccountListing()
            .then((results) => {
                this.accountListing = results;
                console.log(results);
            })
    }

    getAllPositions() {
        let identifier = this._identifierText.nativeElement.value;
        this.CoreService.database.getPositionListing(identifier)
            .then((results) => {
                this.positionListing = results;
                console.log("positions", results);
            })
    }

    setAccountToUpdate(identifier) {
        this._identifierTextUpdate.nativeElement.value = identifier;
        this._identifierText.nativeElement.value = identifier;
        //this.accountUid = accountUid;
    }

    showCreateNewAccount(showHide) {
        if (showHide) {
            this.showCreateAccount = true;
        } else {
            this.showCreateAccount = false;
        }
    }

    createNewAccount() {
        let newValues = {};
        newValues["valueOne"] = this._createAccountInputOne.nativeElement.value;
        newValues["valueTwo"] = this._createAccountInputTwo.nativeElement.value;
        let identifier = this._createAccountIdentifier.nativeElement.value;
        if (identifier === this.defaultValue) {
            identifier = undefined;
        }
        this.showCreateAccount = false;
        this.CoreService.database.accountCreate(newValues, identifier)
            .then((result) => {
                console.log(result);
                if (identifier !== undefined) {
                    this._identifierText.nativeElement.value = identifier;
                }
            })
    }

    importTimer(time, uploadType) {
        //this.importTimeRemaining = time;
        window.setTimeout((timer, uploadKind) => {
            if (timer >= 1000) {
                timer -= 1000;
                this.timerDisplaySeconds = Math.ceil((timer % 60000) / 1000);
                this.timerDisplayMinutes = Math.floor(timer / 60000);
                this.importTimer(timer, uploadKind);
            } else {
                this.importActive[uploadKind] = false;
            }
        }, 1000, time, uploadType)
    }

    _onChangeFileSelect(file, uploadType) {
        if (uploadType === "initial") {
            this._inputTextInitial.nativeElement.value = file.name;
        } else {
            this._inputTextUpdate.nativeElement.value = file.name;
        }
    }

    _onFileUpload(data): void {
        if (data["done"] || data["abort"] || data["error"]) {
            this._onFileUploadCompleted(data);
        } else {
            this.onFileUpload.emit(data);
        }
    }

    _onFileUploadCompleted(data): void {
        this.uploadFileInProgress = false;
        this.onFileUploadCompleted.emit(data);
    }

}
