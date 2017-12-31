import { Component, Input, OnInit } from "@angular/core";
import _ from "lodash";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {UnderscorePipe} from "ngx-pipes/src/app/pipes/string/underscore";

import { ConfigurationService } from "../../configuration.service";
import { CoreService } from "../../../../core.service";
// import { Opinions, ThresholdFieldsModel, ThresholdValuesModel } from "./thresholdValueModel";
import "style-loader!./customStyles.scss";
import { PagesDataComm } from "../../../pagesDataComm.service";


@Component({
    selector: "thresholdvalues",
    templateUrl: "./thresholdValues.html",
    providers: [ConfigurationService]
})
export class ThresholdValues implements OnInit {
    @Input() inputArray: Array<any> = [];
    private helpText: object;
    private toolPlacement: object;
    // thresholdValues: thresholdModel;
    thresholdValueForm: FormGroup;
    formArray: FormArray;
    OpinionForm: FormGroup;


    constructor(public CoreService: CoreService, private configService: ConfigurationService, private fb: FormBuilder, private PagesDataComm: PagesDataComm) {
        this.helpText = PagesDataComm.state.helpText;
        this.toolPlacement = PagesDataComm.state.toolPlacement;
    }

    ngOnInit(): void {


        console.log(this.CoreService.config.opinionThresholds.store);
        console.log(_.keys(this.CoreService.config.opinionThresholds.get()).length);
        if (_.keys(this.CoreService.config.opinionThresholds.get()).length === 0) {
            this.thresholdValues = this.configService.thresholdTemplate;
            this. createForm(this.thresholdValues);
        } else {
            this.thresholdValues = _.clone(this.CoreService.config.opinionThresholds.store);
            this. createForm(this.thresholdValues);
        }
    }

    trackByIndex(index: number, value: number) {
        return index;
    }

    saveThresholdValues() {
        console.log("this.thresholdValues", this.thresholdValues);
         this.CoreService.config.opinionThresholds.store = this.thresholdValues;
         alert("Saved");
    }


    createForm(thValues) {


/*        this.formObject = this.formBuilder.group({});

        for(let prop in thValues){

        }




        this.goodOpinion = this.formBuilder.array([this.formBuilder.group({
            good: []
        })]);

        this.neutralOpinion = this.formBuilder.array([this.formBuilder.group({
            neutral: []
        })]);

        this.negativeOpinion = this.formBuilder.array([this.formBuilder.group({
            negative: []
        })]);

        this.OpinionForm = this.formBuilder.group({
            good: this.formBuilder.array([new FormControl()]),
            neutral: this.formBuilder.array([new FormControl()]),
            negative: this.formBuilder.array([new FormControl()]),
        });

        this.thresholdValueForm = this.formBuilder.group({
            industryGroups: this.OpinionForm,
            macroSectors: this.OpinionForm,
            dvidendYield: this.OpinionForm,
            PEG: this.OpinionForm,
            changeVsSP500: this.OpinionForm,
            CreditSuisse: this.OpinionForm,
            Monrningstar: this.OpinionForm,
            WellsFargoSecurities: this.OpinionForm,
            MorningstarQuant: this.OpinionForm,
            QuantCore: this.OpinionForm,
            QuantGrowth: this.OpinionForm,
            QuantValue: this.OpinionForm,
        });

        this.thresholdValueForm.setValue(thValues);*/

    }
}
