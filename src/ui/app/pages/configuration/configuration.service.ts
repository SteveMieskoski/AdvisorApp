import { Injectable } from "@angular/core";


@Injectable()
export class ConfigurationService{
    constructor(){
        this.thresholdTemplate = {
            industryGroups : {
                good: ["#7FEE5B"],
                neutral: ["#fcfa56"],
                negative: ["#fc6561"]
            },
            macroSectors:{
                good: ["#7FEE5B"],
                neutral: ["#fcfa56"],
                negative: ["#fc6561"]
            },
            dvidendYield: {
                good: [2.00],
                neutral: [1.00, 2.00],
                negative: [1.00, "--"]
            },
            PEG: {
                good: [1.4],
                neutral: [1.5, 1.9],
                negative: [2.0, "--"]
            },
            changeVsSP500: {
                good: [5.00],
                neutral: [-5.00, 5.00],
                negative: [-5.00]
            },
            CreditSuisse: {
                good: ["Outperform"],
                neutral: ["Neutral"],
                negative: ["Underperform"]
            },
            Monrningstar: {
                good: ["Buy"],
                neutral: ["Hold"],
                negative: ["Sell"]
            },
            WellsFargoSecurities: {
                good: ["Outperform"],
                neutral: ["Market perform"],
                negative: ["Underperform"]
            },
            MorningstarQuant: {
                good: ["Undervalued"],
                neutral: ["Fairly valued"],
                negative: ["Overvalued"]
            },
            QuantCore: {
                good: [2],
                neutral: [3],
                negative: [4]
            },
            QuantGrowth:{
                good: [2],
                neutral: [3],
                negative: [4]
            },
            QuantValue:{
                good: [2],
                neutral: [3],
                negative: [4]
            }
        }

    }
}