const _ = require('lodash');

class ProcessExternalResults {
    constructor(semiStatic, thresholdValues) {
        this.semiStatic = semiStatic || require('./defaultIndustryAndSectorMappings');
        this.greenColor = 0;
        this.yellowColor = 0;
        this.redColor = 0;
        this.raw = false;
        this.thresholdValues = thresholdValues;
    }

    processQueryResult(item) {
        return new Promise((resolve, reject) => {
            let processedItem = {};
            this.result = {};

            this.greenColor = 0;
            this.yellowColor = 0;
            this.redColor = 0;

            for (let prop in item) {
                switch (prop) {
                    case "symbol":
                        processedItem.symbol = item.symbol;
                        break;
                    case "company":
                        processedItem.company = item.company;
                        break;
                    case "MarketPrice":
                        processedItem.MarketPrice = this.MarketPrice(item.MarketPrice);
                        break;
                    case "DWASector":
                        processedItem.DWASector = this.DWASector(item.DWASector);
                        // processedItem.DWASector = this.industrySector(item.IndustrySector, this.semiStatic.industryGroups);
                        break;
                    case "Category":
                        processedItem.Category = this.Category(item.Category);
                        break;
                    case "TechAttribScore":
                        processedItem.TechAttribScore = this.TechAttribScore(item.TechAttribScore);
                        break;
                    case "TrendChartColumn":
                        processedItem.TrendChartColumn = this.TrendChartColumn(item.TrendChartColumn);
                        break;
                    case "PFTrend":
                        processedItem.PFTrend = this.PFTrend(item.PFTrend);
                        break;
                    case "PFSignal":
                        processedItem.PFSignal = this.PFSignal(item.PFSignal);
                        break;
                    case "RSSignal":
                        processedItem.RSSignal = this.RSSignal(item.RSSignal);
                        break;
                    case "RSColumn":
                        processedItem.RSColumn = this.RSColumn(item.RSColumn);
                        break;
                    case "PeerRSSignal":
                        processedItem.PeerRSSignal = this.PeerRSSignal(item.PeerRSSignal);
                        break;
                    case "PeerRSColumn":
                        processedItem.PeerRSColumn = this.PeerRSColumn(item.PeerRSColumn);
                        break;
                    case "WeeklyMomentum":
                        processedItem.WeeklyMomentum = this.WeeklyMomentum(item.WeeklyMomentum);
                        break;
                    case "WeeklyDistribution":
                        processedItem.WeeklyDistribution = this.WeeklyDistribution(item.WeeklyDistribution);
                        break;
                    case "200DayMA":
                        processedItem["200DayMA"] = this.twoHundredDayMA(item["200DayMA"]);
                        break;
                    case "VertPriceObj":
                        processedItem.VertPriceObj = this.VertPriceObj(item.VertPriceObj);
                        break;
                    case "RewardRisk":
                        processedItem.RewardRisk = this.RewardRisk(item.RewardRisk);
                        break;
                    case "Yield":
                        processedItem.Yield = this.Yield(item.Yield);
                        break;
                    case "UserNote":
                        processedItem.UserNote = this.UserNote(item.UserNote);
                        break;
                    case "Optionable":
                        processedItem.Optionable = this.Optionable(item.Optionable);
                        break;
                    case "allUS":
                        processedItem.allUS = this.allUSEquities(item.allUS);
                        break;
                    case "leastOneBuy":
                        processedItem.leastOneBuy = this.ratedBuyByAtLeastOne(item.leastOneBuy);
                        break;
                    case "MacroSector":
                        processedItem.MacroSector = this.macroSector(item.MacroSector, this.semiStatic.macroSectors);
                        break;
                    case "IndustrySector":
                        processedItem.IndustrySector = this.industrySector(item.IndustrySector, this.semiStatic.industryGroups);
                        break;
                    case "DividendYield":
                        processedItem.DividendYield = this.dvidendYieldState(item.DividendYield);
                        break;
                    case "PEG":
                        processedItem.PEG = this.PEGState(item.PEG);
                        break;
                    case "chgVsSP":
                        processedItem.chgVsSP = this.changeVsSPState(item.chgVsSP);
                        break;
                    case "CScurr":
                        processedItem.CScurr = this.CreditSuisse(item.CScurr);
                        break;
                    case "Mcurr":
                        processedItem.Mcurr = this.Monrningstar(item.Mcurr);
                        break;
                    case "WFScurr":
                        processedItem.WFScurr = this.WellsFargoSec(item.WFScurr);
                        break;
                    case "MQcurr":
                        processedItem.MQcurr = this.MorningstarQuant(item.MQcurr);
                        break;
                    case "QC":
                        processedItem.QC = this.QuantCore(item.QC);
                        break;
                    case "QG":
                        processedItem.QG = this.QuantGrowth(item.QG);
                        break;
                    case "QV":
                        processedItem.QV = this.QuantValue(item.QV);
                        break;
                    case 'Primary':
                        break;
                }

            }

            processedItem.greenColor = this.greenColor;
            processedItem.yellowColor = this.yellowColor;
            processedItem.redColor = this.redColor;
            processedItem.greenPercent = ((processedItem.greenColor / (processedItem.greenColor + processedItem.yellowColor + processedItem.redColor) * 100).toPrecision(4));
            processedItem.yellowPercent = ((processedItem.yellowColor / (processedItem.greenColor + processedItem.yellowColor + processedItem.redColor) * 100).toPrecision(4));
            processedItem.redPercent = ((processedItem.redColor / (processedItem.greenColor + processedItem.yellowColor + processedItem.redColor) * 100).toPrecision(4));


            resolve(processedItem);

        })
    }

    DWASector(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }

    Category(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    TechAttribScore(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    TrendChartColumn(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    PFTrend(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    PFSignal(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    RSSignal(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    RSColumn(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    PeerRSSignal(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    PeerRSColumn(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    WeeklyMomentum(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    WeeklyDistribution(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    twoHundredDayMA(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    VertPriceObj(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    RewardRisk(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    Yield(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    UserNote(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    Optionable(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }


    MarketPrice(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }

    allUSEquities(dataValue) {
        return {
            value: dataValue,
            opinion: ''
        };
    }

    ratedBuyByAtLeastOne(dataValue) {

        return {
            value: dataValue,
            opinion: ''
        };
    }

    industrySector(dataValue, industryGroups) {
        let sec;
        if (/\./.test(dataValue)) {
            sec = dataValue.replace('.', '');
        } else {
            sec = dataValue;
        }
        if (industryGroups.hasOwnProperty(sec)) {
            switch (industryGroups[sec]) {
                case this.thresholdValues.industryGroups.good[0]:
                    this.greenColor++;

                    return {
                        value: dataValue,
                        opinion: 'good'
                    };
                    break;
                case this.thresholdValues.industryGroups.neutral[0]:
                    this.yellowColor++;

                    return {
                        value: dataValue,
                        opinion: 'neutral'
                    };
                    break;
                case this.thresholdValues.industryGroups.negative[0]:
                    ++this.redColor;

                    return {
                        value: dataValue,
                        opinion: 'negative'
                    };
                    break;
                default:

                    return {
                        value: dataValue,
                        opinion: ''
                    };
                    break;
            }
        } else if (this.semiStatic.sectorMapping.hasOwnProperty(sec)) {
            switch (industryGroups[this.semiStatic.sectorMapping[sec]]) {
                case this.thresholdValues.industryGroups.good[0]:
                    this.greenColor++;

                    return {
                        value: dataValue,
                        opinion: 'good'
                    };
                    break;
                case this.thresholdValues.industryGroups.neutral[0]:
                    this.yellowColor++;

                    return {
                        value: dataValue,
                        opinion: 'neutral'
                    };
                    break;
                case this.thresholdValues.industryGroups.negative[0]:
                    ++this.redColor;

                    return {
                        value: dataValue,
                        opinion: 'negative'
                    };
                    break;
                default:

                    return {
                        value: dataValue,
                        opinion: ''
                    };
                    break;
            }
        }
    }

    macroSector(dataValue, macroSectors) {
        let sec;
        if (/\./.test(dataValue)) {
            sec = dataValue.replace('.', '');
        } else {
            sec = dataValue;
        }

        if (macroSectors.hasOwnProperty(sec)) {
            switch (macroSectors[sec]) {
                case this.thresholdValues.macroSectors.good[0]:
                    this.greenColor++;

                    return {
                        value: dataValue,
                        opinion: 'good'
                    };
                    break;
                case this.thresholdValues.macroSectors.neutral[0]:
                    this.yellowColor++;

                    return {
                        value: dataValue,
                        opinion: 'neutral'
                    };
                    break;
                case this.thresholdValues.macroSectors.negative[0]:
                    ++this.redColor;

                    return {
                        value: dataValue,
                        opinion: 'negative'
                    };
                    break;
                default:

                    return {
                        value: dataValue,
                        opinion: ''
                    };
                    break;
            }
        }
    }

    dvidendYieldState(dataValue) {
        let divd;
        if (/%/.test(dataValue)) {
            divd = dataValue.replace('%', '');
        } else {
            divd = dataValue;
        }
        //  divd = parseFloat(divd);
        if (divd >= this.thresholdValues.dvidendYield.good[0]) {

            this.greenColor++;

            return {
                value: divd,
                opinion: 'good'
            };
        } else if (divd > this.thresholdValues.dvidendYield.neutral[0] && divd < this.thresholdValues.dvidendYield.neutral[1]) {
            this.yellowColor++;

            return {
                value: divd,
                opinion: 'neutral'
            };
        } else if (divd < this.thresholdValues.dvidendYield.negative[0] || divd === this.thresholdValues.dvidendYield.negative[1]) {
            this.redColor++;

            return {
                value: divd,
                opinion: 'negative'
            };
        } else {

            return {
                value: divd,
                opinion: ''
            };
        }
    }

    PEGState(dataValue) {
        let peg;
        if (/x/.test(dataValue)) {
            peg = dataValue.replace('x', '');
        } else {
            peg = dataValue;
        }
        //   peg = parseFloat(peg);
        if (peg <= this.thresholdValues.PEG.good[0]) {
            this.greenColor++;


            return {
                value: dataValue,
                opinion: 'good'
            };
        } else if (peg > this.thresholdValues.PEG.neutral[0] && peg < this.thresholdValues.PEG.neutral[1]) {
            this.yellowColor++;

            return {
                value: dataValue,
                opinion: 'neutral'
            };
        } else if (peg >= this.thresholdValues.PEG.negative[0] || peg === this.thresholdValues.PEG.negative[1]) {
            this.redColor++;

            return {
                value: dataValue,
                opinion: 'negative'
            };
        } else {

            return {
                value: dataValue,
                opinion: ''
            };
        }
    }

    changeVsSPState(dataValue) {
        let chng;
        if (/%/.test(dataValue)) {
            chng = dataValue.replace('%', '');
        } else {
            chng = dataValue;
        }
        ;
        //   chng = parseFloat(chng);
        if (chng >= this.thresholdValues.changeVsSP500.good[0]) {

            this.greenColor++;

            return {
                value: dataValue,
                opinion: 'good'
            };
        } else if (chng > this.thresholdValues.changeVsSP500.neutral[0] && chng < this.thresholdValues.changeVsSP500.neutral[1]) {
            this.yellowColor++;

            return {
                value: dataValue,
                opinion: 'neutral'
            };
        } else if (chng <= this.thresholdValues.changeVsSP500.negative[0]) {
            this.redColor++;

            return {
                value: dataValue,
                opinion: 'negative'
            };
        } else {

            return {
                value: dataValue,
                opinion: ''
            };
        }
    }

    CreditSuisse(dataValue) {
        switch (dataValue) {
            case this.thresholdValues.CreditSuisse.good[0]:

                this.greenColor++;

                return {
                    value: dataValue,
                    opinion: 'good'
                };
                break;
            case this.thresholdValues.CreditSuisse.neutral[0]:
                this.yellowColor++;

                return {
                    value: dataValue,
                    opinion: 'neutral'
                };
                break;
            case this.thresholdValues.CreditSuisse.negative[0]:
                this.redColor++;

                return {
                    value: dataValue,
                    opinion: 'negative'
                };
                break;
            default:

                return {
                    value: dataValue,
                    opinion: ''
                };
                break;
        }
    }

    Monrningstar(dataValue) {
        switch (dataValue) {
            case this.thresholdValues.Monrningstar.good[0]:

                this.greenColor++;

                return {
                    value: dataValue,
                    opinion: 'good'
                };
                break;
            case this.thresholdValues.Monrningstar.neutral[0]:
                this.yellowColor++;

                return {
                    value: dataValue,
                    opinion: 'neutral'
                };
                break;
            case this.thresholdValues.Monrningstar.negative[0]:
                this.redColor++;

                return {
                    value: dataValue,
                    opinion: 'negative'
                };
                break;
            default:

                return {
                    value: dataValue,
                    opinion: ''
                };
                break;
        }
    }

    WellsFargoSec(dataValue) {
        switch (dataValue) {
            case this.thresholdValues.WellsFargoSecurities.good[0]:

                this.greenColor++;

                return {
                    value: dataValue,
                    opinion: 'good'
                };
                break;
            case this.thresholdValues.WellsFargoSecurities.neutral[0]:
                this.yellowColor++;

                return {
                    value: dataValue,
                    opinion: 'neutral'
                };
                break;
            case this.thresholdValues.WellsFargoSecurities.negative[0]:
                this.redColor++;

                return {
                    value: dataValue,
                    opinion: 'negative'
                };
                break;
            default:

                return {
                    value: dataValue,
                    opinion: ''
                };
                break;
        }
    }

    MorningstarQuant(dataValue) {
        switch (dataValue) {
            case this.thresholdValues.MorningstarQuant.good[0]:

                this.greenColor++;

                return {
                    value: dataValue,
                    opinion: 'good'
                };
                break;
            case this.thresholdValues.MorningstarQuant.neutral[0]:
                this.yellowColor++;

                return {
                    value: dataValue,
                    opinion: 'neutral'
                };
                break;
            case this.thresholdValues.MorningstarQuant.negative[0]:
                this.redColor++;

                return {
                    value: dataValue,
                    opinion: 'negative'
                };
                break;
            default:

                return {
                    value: dataValue,
                    opinion: ''
                };
                break;
        }
    }

    QuantCore(dataValue) {
        let qcValue = dataValue;
        //   qcValue = parseInt(qcValue);
        if (qcValue <= this.thresholdValues.QuantCore.good[0]) {

            this.greenColor++;

            return {
                value: qcValue,
                opinion: 'good'
            };
        } else if (qcValue === this.thresholdValues.QuantCore.neutral[0]) {
            this.yellowColor++;

            return {
                value: qcValue,
                opinion: 'neutral'
            };
        } else if (qcValue >= this.thresholdValues.QuantCore.negative[0]) {
            this.redColor++;

            return {
                value: qcValue,
                opinion: 'negative'
            };
        } else {

            return {
                value: qcValue,
                opinion: ''
            };
        }
    }

    QuantGrowth(dataValue) {
        let qgValue = dataValue;
        //   qgValue = parseInt(qgValue);
        if (qgValue <= this.thresholdValues.QuantGrowth.good[0]) {

            this.greenColor++;

            return {
                value: qgValue,
                opinion: 'good'
            };
        } else if (qgValue === this.thresholdValues.QuantGrowth.neutral[0]) {
            this.yellowColor++;

            return {
                value: qgValue,
                opinion: 'neutral'
            };
        } else if (qgValue >= this.thresholdValues.QuantGrowth.negative[0]) {
            this.redColor++;

            return {
                value: qgValue,
                opinion: 'negative'
            };
        } else {

            return {
                value: qgValue,
                opinion: ''
            };
        }
    }

    QuantValue(dataValue) {
        let qvValue = dataValue;
        //    qvValue = parseInt(qvValue);
        if (qvValue <= this.thresholdValues.QuantValue.good[0]) {

            this.greenColor++;

            return {
                value: qvValue,
                opinion: 'good'
            };
        } else if (qvValue === this.thresholdValues.QuantValue.neutral[0]) {
            this.yellowColor++;

            return {
                value: qvValue,
                opinion: 'neutral'
            };
        } else if (qvValue >= this.thresholdValues.QuantValue.negative[0]) {
            this.redColor++;

            return {
                value: qvValue,
                opinion: 'negative'
            };
        } else {

            return {
                value: qvValue,
                opinion: ''
            };
        }
    }
}


module.exports = ProcessExternalResults;