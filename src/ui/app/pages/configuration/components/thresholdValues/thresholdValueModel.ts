
export class Opinions{
    good: Array<any> = [];
    neutral: Array<any> = [];
    negative: Array<any> = [];
}


export class ThresholdFieldsModel{
    industryGroups: Opinions;
    macroSectors: Opinions;
    dvidendYield: Opinions;
    PEG: Opinions;
    changeVsSP500: Opinions;
    CreditSuisse: Opinions;
    Monrningstar: Opinions;
    WellsFargoSecurities: Opinions;
    MorningstarQuant: Opinions;
    QuantCore: Opinions;
    QuantGrowth: Opinions;
    QuantValue: Opinions;
}


export class ThresholdValuesModel{
    thresholdValues: ThresholdFieldsModel;
}