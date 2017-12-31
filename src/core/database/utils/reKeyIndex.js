
module.exports = {
    "Primary": "Primary",
    // taken from well screen sheet
    'Symbol': 'symbol',
    'Company': 'company',
    "All U.S. equities": "allUS",
    "Buy rated by at least one fundamental provider": "leastOneBuy",
    "GICs Sectors": "MacroSector",
    "GICs Industries": "IndustrySector",
    "Dividend yield (TTM)": "DividendYield",
    "PEG": "PEG",
    "Price change YTD vs S&P 500": "chgVsSP",
    "Credit Suisse - current rating": "CScurr",
    "Morningstar - current rating": "Mcurr",
    "Wells Fargo Securities - current rating": "WFScurr",
    "Morningstar Quant - valuation":  "MQcurr",
    "Golden Capital Quant Score - core":  "QC",
    "Golden Capital Quant Score - growth": "QG",
    "Golden Capital Quant Score - value": "QV",

    // Taken from all stocks excl sheets
    'Name' : 'company',
    "Recent Price": "MarketPrice",
    "Category": "Category",
    "Tech Attrib / Score" : "TechAttribScore",
    "Trend Chart Column" : "TrendChartColumn",
    "PF Trend" : "PFTrend",
    "P&F Signal": "PFSignal",
    "RS Signal": "RSSignal",
    "RS Column" : "RSColumn",
    "Peer RS Signal" : "PeerRSSignal",
    "Peer RS Column" : "PeerRSColumn",
    "Weekly Momentum" : "WeeklyMomentum",
    "Weekly Distribution" : "WeeklyDistribution",
    "200 Day MA" : "200DayMA",
    "Vert Price Obj" : "VertPriceObj",
    "Reward/Risk" : "RewardRisk",
    "Yield" : "Yield",
    "Optionable" : "Optionable",
    "User Note" : "UserNote",
    "DWA Sector": "DWASector",

    // Account Position (from stock data excl file)
    "QUANTITY": "quantity",
    "SYMBOL": "symbol",
    "DESCRIPTION 1": "company",
    "OPEN DATE": "openDate",
    "COST AMOUNT": "costAmount",
    "MKT PRICE": "marketPrice",
    "UNIT COST": "unitCost",
    "BLENDED UNIT COST": "blendedUnitCost",
    "VALUE": "value",
    "UNREALIZED": "unrealized",
    "TERM": "term",
    "% GAIN/LOSS": "percentGainLoss",
    "INCOME": "income",
    "CURR YIELD": "currentYield",
    "GIFT DATE": "giftDate",
    "S&P PRIMARY RATING": "spPrimaryRating",
    "MOODY PRIMARY RATING": "moodyPrimaryRating"
};
/*



 Symbol: equities[i]["Symbol"],
 Company: equities[i]["Name"],
 "Recent Price": equities[i]["Recent Price"],
 "DWA Sector": DW_Sector,
 "Category": equities[i]["Category"],
 "Tech Attrib / Score": equities[i]["Tech Attrib / Score"],
 "Trend Chart Column": equities[i]["Trend Chart Column"],
 "PF Trend": equities[i]["PF Trend"],
 "P&F Signal": equities[i]["P&F Signal"],
 "RS Signal": equities[i]["RS Signal"],
 "RS Column": equities[i]["RS Column"],
 "Peer RS Signal": equities[i]["Peer RS Signal"],
 "Peer RS Column": equities[i]["Peer RS Column"],
 "Weekly Momentum": equities[i]["Weekly Momentum"],
 "Weekly Distribution": equities[i]["Weekly Distribution"],
 "200 Day MA": equities[i]["200 Day MA"],
 "Vert Price Obj": equities[i]["Vert Price Obj"],
 "Reward/Risk": equities[i]["Reward/Risk"],
 "Yield": equities[i]["Yield"],
 "User Note": equities[i]["User Note"],
 "Optionable": equities[i]["Optionable"]










*/
/*
Using Column Name Algorithm: spaces -> _ , non-alphanumeric removed
 "Symbol": "symbol",
 "Company": "company",
 "All U.S. equities": "All_US_equities",
 "Buy rated by at least one fundamental provider": "Buy_rated_by_at_least_one_fundamental_provider",
 "GICs Sectors": "GICs_Sectors",
 "GICs Industries": "GICs_Industries",
 "Dividend yield (TTM)": "Dividend_yield_TTM",
 "PEG": "PEG",
 "Price change YTD vs S&P 500": "Price_change_YTD_vs_SP_500",
 "Credit Suisse - current rating": "Credit_Suisse__current_rating",
 "Morningstar - current rating": "Morningstar__current_rating",
 "Wells Fargo Securities - current rating": "Wells_Fargo_Securities__current_rating",
 "Morningstar Quant - valuation": "Morningstar_Quant__valuation",
 "Golden Capital Quant Score - core": "Golden_Capital_Quant_Score__core",
 "Golden Capital Quant Score - growth": "Golden_Capital_Quant_Score__growth",
 "Golden Capital Quant Score - value": "Golden_Capital_Quant_Score__value"
 */