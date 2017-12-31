let _ = require('lodash');




function buildScreenerSelectLists(results) {
    let columns = {};
    let columnCheck = [];
    for (var i = 0; i < results.length; i++) {
        var keys = Object.keys(results[i]);
        for (var j = 0; j < keys.length; j++) {
            let noDisplay = ['_id', '__v', '_kind', 'created_at', 'updated_at'];
            if (noDisplay.indexOf(keys[j]) === -1) {
                if (_.has(columns, keys[j])) {
                    switch (typeof results[i][keys[j]]) {
                        case 'string':
                            if (columnCheck[keys[j]].indexOf(results[i][keys[j]]) === -1) {
                                columns[keys[j]].push({label: results[i][keys[j]], value: results[i][keys[j]]});
                                columnCheck[keys[j]].push(results[i][keys[j]])
                            }
                            break;
                        case 'object':
                            if (columns[keys[j]].indexOf(results[i][keys[j]].value) === -1) {
                                columns[keys[j]].push({
                                    label: results[i][keys[j]].value,
                                    value: results[i][keys[j]].value
                                });
                                columnCheck[keys[j]].push(results[i][keys[j]].value)
                            }
                            break;
                    }
                } else {
                    switch (typeof results[i][keys[j]]) {
                        case 'string':
                            columns[keys[j]] = [{label: results[i][keys[j]], value: results[i][keys[j]]}];
                            columnCheck[keys[j]] = [results[i][keys[j]]];
                            break;
                        case 'object':
                            columns[keys[j]] = [{
                                label: results[i][keys[j]].value,
                                value: results[i][keys[j]].value
                            }];
                            columnCheck[keys[j]] = [results[i][keys[j]].value];
                            break;
                    }

                }
            }

        }
    }
    return columns;
}


function buildRebalanceSelectLists(results) {
    return new Promise((resolve, reject) => {
        let columns = {};
        let columnCheck = [];
        for (var i = 0; i < results.length; i++) {
            var keys = Object.keys(results[i]);
            for (var j = 0; j < keys.length; j++) {
                let noDisplay = ['_id', '__v', '_kind', 'created_at', 'updated_at', 'internalId'];
                if (noDisplay.indexOf(keys[j]) === -1) {
                    if (_.has(columns, keys[j])) {
                        switch (typeof results[i][keys[j]]) {
                            case 'string':
                                if (columnCheck[keys[j]].indexOf(results[i][keys[j]]) === -1) {
                                    columns[keys[j]].push({label: results[i][keys[j]], value: results[i][keys[j]]});
                                    columnCheck[keys[j]].push(results[i][keys[j]])
                                }
                                break;
                            case 'object':
                                if (columns[keys[j]].indexOf(results[i][keys[j]].value) === -1) {
                                    columns[keys[j]].push({
                                        label: results[i][keys[j]].value,
                                        value: results[i][keys[j]].value
                                    });
                                    columnCheck[keys[j]].push(results[i][keys[j]].value)
                                }
                                break;
                            case "number":
                                if (columns[keys[j]].indexOf(results[i][keys[j]]) === -1) {
                                    columns[keys[j]].push({label: results[i][keys[j]], value: results[i][keys[j]]});
                                    columnCheck[keys[j]].push(results[i][keys[j]])
                                }
                                break;
                        }
                    } else {
                        switch (typeof results[i][keys[j]]) {
                            case 'string':
                                columns[keys[j]] = [{label: results[i][keys[j]], value: results[i][keys[j]]}];
                                columnCheck[keys[j]] = [results[i][keys[j]]];
                                break;
                            case 'object':
                                columns[keys[j]] = [{
                                    label: results[i][keys[j]].value,
                                    value: results[i][keys[j]].value
                                }];
                                columnCheck[keys[j]] = [results[i][keys[j]].value];
                                break;
                            case "number":
                                columns[keys[j]] = [{label: results[i][keys[j]], value: results[i][keys[j]]}];
                                columnCheck[keys[j]] = [results[i][keys[j]]];
                                break;
                        }

                    }
                }

            }
        }
        resolve(columns);
    })
}