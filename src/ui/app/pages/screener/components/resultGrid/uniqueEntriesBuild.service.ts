import _ from "lodash";

export class UniqueEntriesBuild {
    private noDisplay: Array<string>;
    private noUniq: Array<string>;
    public columns: any;
    public structuredResult: any;
    public preliminaryResults: any;
    public data: any;
    public keys: Array<string>;
    public fields: any;


    constructor() {
        this.columns = {};
        this.noDisplay = ["_id", "__v", "_kind", "created_at", "updated_at", "uid", "Primary", "alias", "Primary"];
        this.noUniq = ["company", "symbol"];
        this.structuredResult = {};
        this.preliminaryResults = {};
    }


    build(rawData) {
        return new Promise((resolve, reject) => {
            this.data = rawData;
          return this.baseFields(this.data)
                .then((keys) => {
                    // let fieldMap = new Map();
                    let fieldMap = {};
                    keys.forEach((value) => {
                        if (this.noDisplay.indexOf(value) === -1) {
                            fieldMap[value] = new Set();
                        }
                        //  fieldMap.set(value, new Set());
                    })
                   return this.distribute(fieldMap, this.data)
                        .then((result) => {
                            for (let prop in result) {
                                this.preliminaryResults[prop] = Array.from(result[prop]);
                            }
                            console.log("this.preliminaryResults", this.preliminaryResults);
                            resolve({
                                selectLists: this.preliminaryResults,
                                fields: Object.keys(this.preliminaryResults)
                            });
                        })

                })

        })

    }


    baseFields(data) {
        return new Promise((resolve, reject) => {
            let keys;
            if (_.isArray(data)) {
                let forKeys = _.sample(data);
                if (_.isPlainObject(forKeys)) {
                    keys = Object.keys(forKeys);
                } else {
                    forKeys = _.sample(data);
                    keys = Object.keys(forKeys);
                }
            } else {
                if (_.isPlainObject(data)) {
                    keys = Object.keys(data);
                }
            }
            resolve(keys);
        })
    }


    distribute(map, data) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < data.length; i++) {
                for (let prop in map) {

                    if (_.has(data[i][prop], "value")) {
                        map[prop].add(data[i][prop]["value"]);
                    } else {
                        map[prop].add(data[i][prop]);
                    }

                }
            }
            resolve(map);
        })

    }

    beginBuild() {
        let collected = _.transform(this.data, (accum, value, key, col) => {
            _.forEach(_.toPairs(value), (val) => {
                accum[val[0]].push(val[1])
            })
        }, this.columns);
        return this.splitBuild(collected);
    };


    splitBuild(collected) {
        return new Promise((resolve, reject) => {
            _.forOwn(collected, (value, key) => {
                if (_.isString(_.sample(value))) {
                    this.preliminaryResults[key] = this.parseArray(key, value);
                } else {
                    this.preliminaryResults[key] = this.parseObjects(key, value);
                }
            })
            resolve({selectLists: this.preliminaryResults, fields: this.keys});
        })

    }

    parseArray(key, value) {
        if (this.noDisplay.indexOf(key) === -1 && this.noUniq.indexOf(key) === -1) {
            return _.uniq(value);
        } else if (this.noUniq.indexOf(key) >= 0) {
            return value;
        } else {
        }
    }

    parseObjects(key, value) {
        if (_.has(_.sample(value), "value")) {
            return _.map(_.uniqBy(value, _.property("value")), _.property("value"));
        } else {
            return _.uniq(value);
        }
    }


    buildSelectLists(results) {
        let columns = {};
        if (results) {
            //  console.log("SELECT LIST CREATE (WAS THROWING AN ERROR BEFORE)", results);
            let keys = Object.keys(results[0]);
            for (let j = 0; j < keys.length; j++) {

                if (this.noDisplay.indexOf(keys[j]) === -1) {
                    columns[keys[j]] = _.map(results, keys[j]);
                }
            }

            let valueColumns = {};
            let tmp = [];
            for (let prop in columns) {
                if (_.has(columns[prop], "value")) {
                    // not catching what"s its supposed to.  re-initiated right below the else statement
                    if (this.noUniq.indexOf(prop) === -1) {
                        console.log("1", _.uniqBy(columns[prop], _.property("value")));
                        valueColumns[prop] = _.map(_.uniqBy(columns[prop], _.property("value")), _.property("value"));
                        //  tmp = _.uniqBy(columns[prop], "value");
                        //  valueColumns[prop] = _.map(tmp, "value");
                    } else {
                        console.log("2", _.uniqBy(columns[prop], _.property("value")));
                        valueColumns[prop] = columns[prop];
                    }
                } else {
                    if (this.noUniq.indexOf(prop) === -1) {
                        if (_.has(_.sample(columns[prop]), "value")) {
                            //     console.log("3",_.uniqBy(columns[prop], _.property("value")));
                            valueColumns[prop] = _.map(_.uniqBy(columns[prop], _.property("value")), _.property("value"));
                        } else {
                            valueColumns[prop] = _.uniq(columns[prop]);
                        }
                    } else {
                        //   console.log("4", _.uniqBy(columns[prop], _.property("value")));
                        valueColumns[prop] = columns[prop];
                    }
                }
            }
            let selectCollections = {};
            for (let prop of valueColumns) {
                selectCollections[prop] = [];
                _.forEach(valueColumns[prop], (value) => {
                    selectCollections[prop].push({label: value, value: value})
                })
            }
            return selectCollections;
        }

    }

}