/**
 * Created by vaduc on 7/20/2016.
 */
var Q = require("q");
import mongoose = require("mongoose");
import ERROR_CODE = require("../common/ErrorCode");
import {DB_FIELD_TYPE} from "../common/ResourceType";
import {FilterDO} from "../../core/utils/FilterParser";
var _ = require('lodash');

class RepositoryBase<T> {
    private _model:mongoose.Model<mongoose.Document>;

    constructor(schemaModel : mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    convertFilterData(searchType: string = 'and', filterData: FilterDO[]) : Object {
        searchType = searchType ? '$' + searchType : '$and';
        var ltFilterData = {};
        var ltFilters = [];
        var ltWhere = [];

        for (var itField of filterData) {
            var field = itField.field;
            var value = itField.value;
            switch (itField.fieldType) {
                case 'lt':
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) < ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) < ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0,0,0,0).setFullYear(2000) < ' + new Date('2000-' + value).setHours(0, 0, 0));
                            break;
                        default :
                            ltFilters.push({[field]: {$ne: null}});
                    }
                    break;
                case 'lte':
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) <= ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) <= ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB:
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) <= ' + new Date("2000-" + value).setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            ltFilters.push({[field]: {$lte :value}});
                            break;
                        default :
                            ltFilters.push({[field]: {$lte :value}});
                            break;
                    }
                    break;
                case 'gt':
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) > ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) > ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) > ' + new Date("2000-" + value).setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            ltFilters.push({[field]: {$gt :value}});
                            break;
                        default :
                            ltFilters.push({[field]: {$gt :value}});
                            break;
                    }
                    break;
                case 'gte' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) >= ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) >= ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) >= ' + new Date("2000-" + value).setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            ltFilters.push({[field]: {$gte :value}});
                            break;
                        default :
                            ltFilters.push({[field]: {$gte :value}});
                            break;
                    }
                    break;
                case 'eq' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) == ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) == ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) == ' + new Date("2000-" + value).setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            ltFilters.push({[field]: value});
                            break;
                        default :
                            ltFilters.push({[field]: new RegExp('^' + value + '$', 'i')});
                            break;
                    }
                    break;
                case 'neq' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setSeconds(0) != ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.Date :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) != ' + new Date(value).getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) != ' + new Date("2000-" + value).setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            ltFilters.push({[field]: {$ne :value}});
                            break;
                        default :
                            ltFilters.push({[field]: {$not :new RegExp('^' + value + '$', 'i')}});
                            break;
                    }
                    break;
                case 'contains':
                    ltFilters.push({[field]: new RegExp(value, 'i')});
                    break;
                case 'ncontains':
                    ltFilters.push({[field]: {$not: new RegExp(value, 'i')}});
                    break;
                case 'startswith':
                    ltFilters.push({[field]: new RegExp('^' + value, 'i')});
                    break;
                case 'nstartswith':
                    ltFilters.push({[field]: {$not: new RegExp('^' + value, 'i')}});
                    break;
                case 'endswith':
                    ltFilters.push({[field]: new RegExp(value + '$', 'i')});
                    break;
                case 'nendswith':
                    ltFilters.push({[field]: {$not: new RegExp(value + '$', 'i')}});
                    break;
                case 'isempty':
                    if (value == 'true') ltFilters.push({[field]: null});
                    else  ltFilters.push({[field]: {$ne: null}});
                    break;
                case 'isnempty':
                    ltFilters.push({[field]: {$ne: null}});
                    break;
                case 'in':
                    ltFilters.push({[field]: {$in: value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/)}});
                    break;
                case 'nin':
                    ltFilters.push({[field]: {$nin: value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/)}});
                    break;
                case 'range':
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                            let rangeDateTime = value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                            ltFilters.push({[field]: {$gte: new Date(rangeDateTime[0]), $lte: new Date(rangeDateTime[1])}});
                            break;
                        case DB_FIELD_TYPE.Date :
                            let rangeDate = value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                            ltFilters.push({[field]: {$gte: new Date(rangeDate[0]), $lte: new Date(rangeDate[1])}});
                            break;
                        case DB_FIELD_TYPE.DOB :
                            let rangeDob = value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                            let rangeDobFrom = new Date(rangeDob[0]);
                            rangeDobFrom.setFullYear(2000);

                            let rangeDobTo = new Date(rangeDob[1]);
                            rangeDobTo.setFullYear(2000);
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setFullYear(2000) >= ' + rangeDobFrom.setHours(0, 0, 0) +' && this.'
                                + field + '.setFullYear(2000) <= '+rangeDobTo.setHours(0, 0, 0));
                            break;
                        case DB_FIELD_TYPE.Number :
                            let data = value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                            var it1 = Number(data[0]);
                            var it2 = Number(data[1]);
                            if (!isNaN(it1) && !isNaN(it1)) {
                                ltFilters.push({[field]: {$gte: it1, $lte: it2}});
                            }
                            break;
                    }
                    break;

                case 'eqnoyear':
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) == ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'neqnoyear' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) != ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'gtnoyear' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) > ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'ltnoyear' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) < ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'gtenoyear' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) >= ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'ltenoyear' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) <= ' + new Date("2000-" + value).setHours(0, 0, 0));
                    break;

                case 'rangenoyear' :
                    var range = value.split(',');
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('this.' + field + '.setFullYear(2000) > new Date("2000-' + range[0] + '") && this.' + field + '.setFullYear(2000) < new Date("2000-' + range[1] + '")');
                    break;

                case 'istoday' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var timeNow = new Date().setHours(0,0,0,0);
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) == '+timeNow);
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var timeNow = new Date(new Date().setHours(0,0,0,0)).setFullYear(2000);
                            console.log(timeNow)
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) == '+timeNow);
                            break;
                        default :
                            var timeNow = new Date().setHours(0,0,0,0);
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) == '+timeNow);
                            break;
                    }
                    break;

                case 'istomorrow' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setDate(now.getDate() + 1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) == '+now.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setDate(now.getDate() + 1);
                            now.setFullYear(2000);
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) == '+now.getTime());
                            break;
                    }
                    break;

                case 'isyesterday' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setDate(now.getDate() - 1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) == '+now.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setDate(now.getDate() - 1);
                            now.setFullYear(2000);
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) == '+now.getTime());
                            break;
                    }
                    break;

                case 'inlast7days' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var lastXDay = new Date();
                            lastXDay.setHours(0,0,0,0);
                            lastXDay.setDate(lastXDay.getDate() - 7);

                            var now = new Date();
                            now.setHours(0,0,0,0);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) >= '+lastXDay.getTime() +' && this.' + field + '.setHours(0,0,0,0) < '+now.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var lastXDay = new Date();
                            lastXDay.setHours(0,0,0,0);
                            lastXDay.setFullYear(2000);
                            lastXDay.setDate(lastXDay.getDate() - 7);

                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setFullYear(2000);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) >= '+lastXDay.getTime() +' && new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) < '+now.getTime());
                            break;
                    }
                    break;

                case 'inlastxdays' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var lastXDay = new Date();
                            lastXDay.setHours(0,0,0,0);
                            lastXDay.setFullYear(2000);
                            lastXDay.setDate(lastXDay.getDate() - value);

                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setFullYear(2000);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) >= '+lastXDay.getTime() +' && this.' + field + '.setHours(0,0,0,0) < '+now.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var lastXDay = new Date();
                            lastXDay.setHours(0,0,0,0);
                            lastXDay.setFullYear(2000);
                            lastXDay.setDate(lastXDay.getDate() - value);

                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setFullYear(2000);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) >= '+lastXDay.getTime() +' && new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) < '+now.getTime());
                            break;
                    }
                    break;

                case 'islastmonth' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();
                            temp.setMonth(temp.getMonth()-1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth() + 'this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            temp.setMonth(temp.getMonth()-1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth());
                            break;
                    }
                    break;

                case 'islastyear' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();
                            temp.setFullYear(temp.getFullYear()-1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            temp.setFullYear(temp.getFullYear()-1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                    }
                    break;

                case 'inweekmon' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var fromDate = new Date();
                            fromDate.setDate(fromDate.getDate() - fromDate.getDay() + 1);
                            fromDate.setHours(0,0,0,0);

                            var toDate = new Date();
                            toDate.setDate(fromDate.getDate() + 7);
                            toDate.setHours(0,0,0,0);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) >= '+fromDate.getTime()+' && this.' + field + '.setHours(0,0,0,0) <= '+toDate.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var fromDate = new Date();
                            fromDate.setDate(fromDate.getDate() - fromDate.getDay() + 1);
                            fromDate.setHours(0,0,0,0);

                            var toDate = new Date();
                            toDate.setDate(fromDate.getDate() + 7);
                            toDate.setHours(0,0,0,0);

                            var yearCurr =  fromDate.getFullYear();

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setFullYear('+yearCurr+') >= '+fromDate.getTime()+' && this.' + field + '.setFullYear('+yearCurr+') <= '+toDate.getTime());
                            break;
                    }
                    break;

                case 'inweeksun' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var fromDate = new Date();
                            fromDate.setDate(fromDate.getDate() - fromDate.getDay() );
                            fromDate.setHours(0,0,0,0);

                            var toDate = new Date();
                            toDate.setDate(fromDate.getDate() + 7);
                            toDate.setHours(0,0,0,0);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) >= '+fromDate.getTime()+' && this.' + field + '.setHours(0,0,0,0) <= '+toDate.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var fromDate = new Date();
                            fromDate.setDate(fromDate.getDate() - fromDate.getDay());
                            fromDate.setHours(0,0,0,0);

                            var toDate = new Date();
                            toDate.setDate(fromDate.getDate() + 7);
                            toDate.setHours(0,0,0,0);
                            var yearCurr =  fromDate.getFullYear();

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setFullYear('+yearCurr+') >= '+fromDate.getTime()+' && this.' + field + '.setFullYear('+yearCurr+') <= '+toDate.getTime());
                            break;
                    }
                    break;

                case 'inthismonth' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth() + ' && this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth());

                            break;
                    }
                    break;

                case 'inthisyear' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                    }
                    break;

                case 'innext7days' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var nextXDay = new Date();
                            nextXDay.setHours(0,0,0,0);
                            nextXDay.setDate(nextXDay.getDate() + 7);

                            var now = new Date();
                            now.setHours(0,0,0,0);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) > '+now.getTime() +' && this.' + field + '.setHours(0,0,0,0) <= '+nextXDay.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var nextXDay = new Date();
                            nextXDay.setHours(0,0,0,0);
                            nextXDay.setFullYear(2000);
                            nextXDay.setDate(nextXDay.getDate() + 7);

                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setFullYear(2000);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) > '+now.getTime() +' && new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) <= '+nextXDay.getTime());
                            break;
                    }
                    break;

                case 'innextxdays' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var nextXDay = new Date();
                            nextXDay.setHours(0,0,0,0);
                            nextXDay.setDate(nextXDay.getDate() + value);

                            var now = new Date();
                            now.setHours(0,0,0,0);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.setHours(0,0,0,0) > '+now.getTime() +' && this.' + field + '.setHours(0,0,0,0) <= '+nextXDay.getTime());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var nextXDay = new Date();
                            nextXDay.setHours(0,0,0,0);
                            nextXDay.setFullYear(2000);
                            nextXDay.setDate(nextXDay.getDate() + value);

                            var now = new Date();
                            now.setHours(0,0,0,0);
                            now.setFullYear(2000);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) > '+now.getTime() +' && new Date(this.' + field + '.setHours(0,0,0,0)).setFullYear(2000) <= '+nextXDay.getTime());
                            break;
                    }
                    break;

                case 'isnextmonth' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();
                            temp.setMonth(temp.getMonth()+1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth() + ' && this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            temp.setMonth(temp.getMonth()+1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getMonth() == '+temp.getMonth());
                            break;
                    }
                    break;

                case 'isnextyear' :
                    switch (itField.fieldType) {
                        case DB_FIELD_TYPE.Datetime :
                        case DB_FIELD_TYPE.Date :
                            var temp = new Date();
                            temp.setFullYear(temp.getFullYear()+1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                        case DB_FIELD_TYPE.DOB :
                            var temp = new Date();
                            temp.setFullYear(temp.getFullYear()+1);

                            ltFilters.push({[field]: {$ne: null}});
                            ltWhere.push('this.' + field + '.getFullYear() == '+temp.getFullYear());
                            break;
                    }
                    break;

                case 'eqnumofyears' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) == ' + value);
                    break;

                case 'neqnumofyears' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) != ' + value);
                    break;

                case 'gtnumofyears' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) > ' + value);
                    break;

                case 'ltnumofyears' :
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push('Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) < ' + value);
                    break;

                case 'rangenuofyears' :
                    var ltData = value.replace(/^\s*|\s*$/g, '').split(/\s*,\s*/);
                    ltFilters.push({[field]: {$ne: null}});
                    ltWhere.push(ltData[0] + ' < Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) && Math.floor((new Date() - this.' + field + ')/(1000*60*60*24*365)) < ' + ltData[1]);
                    break;

                case 'istrue' :
                    ltFilters.push({[field]: value});
                    break;
            }
        }
        if (ltFilters.length > 0) {
            ltFilterData[searchType] = ltFilters;
        }
        if (ltWhere.length > 0) {
            ltFilterData['$where'] = "return " + ltWhere.join(' && ');
        }
        return ltFilterData;
    }

    filter(page?:number, pageSize:number = 10, filterDefault?:Object, filterData?:FilterDO[], searchType?:string, selectedFields?:string[], sortBy?:any) {
        var ltFilterData = this.convertFilterData(searchType, filterData);

        for (var f in filterDefault) {
            ltFilterData[f] = filterDefault[f];
        }
        var query = this._model.find(ltFilterData);

        if (sortBy) query = query.sort(sortBy);

        if (selectedFields) query = query.select(selectedFields.join(' '));

        if (page) {
            query = query.skip((page - 1) * pageSize);
            query = query.limit(pageSize);
        }

        query = query.lean();

        return Q.all([this._model.count(ltFilterData), query]);
    }

    create(item:any, selectedFields?:string[]):any {
        return this._model.create(item)
            .then((rs)=> {
                if (selectedFields) {
                    var itemRT = _.pick(rs, selectedFields);
                    itemRT._id = rs._id;
                    return itemRT;
                }
                else return rs;
            })
    }

    retrieveAll(filter?:any, selectedFields?:string[], lean:boolean = true):any {
        var query = this._model.find(filter);
        if (selectedFields != null) query = query.select(selectedFields.join(' '));

        if (lean === true)query.lean();
        return Q.all([this._model.count(filter), query.exec()]);

    }

    retrieve(page?:number, pageSize:number = 10, filter?:any, selectedFields?:string[], sortBy?:any):any {
        var query = this._model.find(filter);

        if (sortBy) query = query.sort(sortBy);

        if (page) {
            query = query.skip((page - 1) * pageSize);
            query = query.limit(pageSize);
        }

        if (selectedFields) query = query.select(selectedFields.join(' '));

        return Q.all([this._model.count(filter), query]);
    }

    findByIdAndUpdate(item:any):any {
        return this._model.findByIdAndUpdate(item._id, item, {new: true})
            .exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    updateById(id:string, fields:Object, selectedFields?:string[]):any {
        let query = this._model.findByIdAndUpdate(id, fields, {new: true});
        if (selectedFields != null) {
            query = query.select(selectedFields.join(' '));
        }
        return query.exec().then((res) => {
            if (res != null) {
                return res;
            } else {
                throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }

    /**
     *
     * @param id
     * @param fields
     * @param options
     * @param select
     * @returns {Promise<U>}
     */
    updateByIdWithOptions(id:string, fields:Object, options?:Object, select?:string[]):any {
        let query = this._model.findByIdAndUpdate(id, fields, options);
        if (select != null) {
            query = query.select(select.join(' '));
        }
        return query.exec().then((res) => {
            if (res != null) {
                return res;
            } else {
                throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }


    /*
     cond: conditions to find the object
     update: data to update
     selectedFields: select fields
     */
    update(cond:Object, update:Object, options?:Object):any {
        let updateOptions = {};
        if (options) {
            options['new'] = true;
            updateOptions = options;
        } else {
            updateOptions['new'] = true;
        }
        var query = this._model.update(cond, update, updateOptions);
        return query.exec().then((res) => {
            if (res != null) {
                return res;
            } else {
                throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }


    /*
     cond: conditions to find the object
     update: data to update
     options: set multi/upsert
     selectedFields: select fields
     */
    updateWithOptions(cond:Object, update:Object, options?:Object, selectedFields?:string[]):any {
        var query = this._model.update(cond, update, options);
        if (selectedFields != null) {
            query = query.select(selectedFields.join(' '));
        }
        return query.exec().then((res) => {
            if (res != null) {
                return res;
            } else {
                throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }

    deleteById(id:string):any {
        return this._model.remove({_id: this.toObjectId(id)}).exec()
            .then((rs) => {
                if (rs['result']['n'] == 0) {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }

                //return total row delete
                return rs['result'];
            });
    }

    delete(cond:Object):any {
        return this._model.remove(cond).exec()
            .then((rs) => {
                if (rs['result']['n'] == 0) {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }

                //return total row delete
                return rs['result']['ok'];
            });
    }

    findById(id:string, selectedFields?:string[], lean?:boolean):any {
        let query = this._model.findById(id);

        if (selectedFields != null) query = query.select(selectedFields.join(' '));

        return query.exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    findOne(cond:Object, selectedFields?:string[], lean:boolean = true):any {
        let query = this._model.findOne(cond);
        if (selectedFields != null) query = query.select(selectedFields.join(' '));

        query = lean ? query.lean() : query;

        return query.exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    findOneAndUpdate(cond:Object, update:Object, options?:Object, select?:string[]):any {
        let query = this._model.findOneAndUpdate(cond, update, options ? options : {new: true});
        if (select != null) query = query.select(select.join(' '));
        return query.exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    findByProperty(name:string, value:string, select?:string[], findOne:boolean = false, lean:boolean = true):any {
        var query;
        if (findOne) query = this._model.findOne({}).where(name).equals(value);
        else query = this._model.find({}).where(name).equals(value);

        query = select ? query.select(select.join(' ')) : query;
        query = lean ? query.lean() : query;

        return query.exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    findByObject(item:any, selectedFields?:string[], lean:boolean = true):any {
        var query = this._model.find(item);
        if (selectedFields != null) query = query.select(selectedFields.join(' '));

        query = lean ? query.lean() : query;

        return query.exec()
            .then((res) => {
                if (res != null) {
                    return res;
                } else {
                    throw ERROR_CODE.VALIDATION.KEY_NOT_FOUND;
                }
            });
    }

    populate(doc:any, path:string, select?:string[]):any {
        return this._model.populate(doc, {path: path, select: select ? select.join(' ') : ' '});
    }

    count(item:any):any {
        return this._model.count(item);
    }

    toObjectId(id:string):mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }
}

export = RepositoryBase;