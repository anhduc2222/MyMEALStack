/**
 * Created by vaduc on 7/20/2016.
 */
/// <reference path="../../../../typings/index.d.ts" />
var _ = require('lodash');

module FilterParser {
    export function queryFilterToJson(query, fields:{}={}):FilterDO[] {
        var ltFilters:FilterDO[] = [];
        //region Update CustomFields
        if(query.customFields !== undefined){
            for(var itField in query.customFields){
                query['customFields.'+itField] =  query.customFields[itField];
            }
        }
        //endregion

        for (var dtField in query) {
            var obj = dtField.split('__');
            if (obj.length == 2) {
                if (_.isArray(query[dtField])) {
                    for (var value of query[dtField]) {
                        ltFilters.push({
                            field: obj[0],
                            operator: obj[1],
                            value: value,
                            fieldType: fields[obj[0]].fieldType
                        })
                    }
                } else {
                    ltFilters.push({
                        field: obj[0],
                        operator: obj[1],
                        value: query[dtField],
                        fieldType: fields[obj[0]].fieldType
                    })
                }
            }
        }
        return ltFilters;
    }

    export function filterParser(filterData?:FilterDO, searchType?:string) {
        var ltFilters = {};
        searchType = searchType ? '$' + searchType : '$and';
        for (var field in filterData) {
            if (ltFilters[field] == null) ltFilters[field] = {};
            var value = filterData[field].value;

            switch (filterData[field].operator) {
                case 'contains':
                    ltFilters[field] = new RegExp(value, 'i');
                    break;
                default:
                    ltFilters[field] = value;
                    break;
            }

        }
        return ltFilters;
    }

    export interface  FilterDO {
        field:string;
        fieldType:string;
        operator:string;
        value:any
    }
}
export = FilterParser;
