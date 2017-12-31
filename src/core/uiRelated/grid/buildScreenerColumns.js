const semiStatic = require('../../static');


module.exports =  prepareScreenerGridColumns;

function prepareScreenerGridColumns(options, uiGridConstants) {
    var columns = Object.keys(options);
    var setupColumns = [];
    for (let i = 0; i < columns.length; i++) {
        setupColumns.push(buildColumn(columns[i], options[columns[i]], uiGridConstants))
    }
    return Promise.all(setupColumns);
}



function buildColumn(key, selectables, uiGridConstants) {
    let keyRelationships = semiStatic.fieldToTableColumns;
    return new Promise((resolve, reject) => {
        let singles = ['greenColor', 'yellowColor', 'redColor', 'greenPercent', 'yellowPercent', 'redPercent', 'symbol', 'company'];
        if (singles.indexOf(key) >= 0) {
            let singlesData = {
                displayName: singles[singles.indexOf(key)],
                field: key,
                minWidth: 120,
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: selectables
                }
            };
            //   console.log('Singles Data', singlesData);
            resolve(singlesData)
        } else {
            let valuesData;
            let numeric = ['chgVsSP', 'PEG', 'DividendYield', 'QC', 'QV', 'QG'];
            if (numeric.indexOf(key) >= 0) {
                console.log(key);
                valuesData = {
                    displayName: keyRelationships.wellsScreener[key],
                    field: key + ".value",
                    minWidth: 120,
                    filters: [
                        {
                            condition: uiGridConstants.filter.GREATER_THAN,
                            placeholder: 'greater than'
                        },
                        {
                            condition: uiGridConstants.filter.LESS_THAN,
                            placeholder: 'less than'
                        }
                    ],
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        // console.log(grid.getCellValue(row, col));
                        //console.log(grid.getCellValue(row, col).entity[key].opinion);
                        //    console.log(row.entity[key].opinion);
                        return row.entity[key].opinion;
                        // console.log(grid);
                    }
                };
                //   console.log('values data', valuesData);
                resolve(valuesData)

            } else {
                console.log(key);
                valuesData = {
                    displayName: keyRelationships.wellsScreener[key],
                    field: key + ".value",
                    minWidth: 120,
                    filter: {
                        type: uiGridConstants.filter.SELECT,
                        selectOptions: selectables
                    },
                    cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                        // console.log(grid.getCellValue(row, col));
                        //console.log(grid.getCellValue(row, col).entity[key].opinion);
                        //      console.log(row.entity[key].opinion);
                        return row.entity[key].opinion;
                        // console.log(grid);
                    }
                };
                //  console.log('values data', valuesData);
                resolve(valuesData)
            }

        }

    })
}