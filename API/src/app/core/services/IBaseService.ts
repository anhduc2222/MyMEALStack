/**
 * Created by vaduc on 7/25/2016.
 */
var _ = require("lodash");

export interface IBaseService<> {
    retrieve:(page:number, pageSize:number)=> any;
    findById:(_id:string) => any;
    create:(item:any) => any;
    update:(_id:string, item:any) => any;
    delete:(_id:string) => any;
    findByKeyValue:(key:string, value:string, select?:string[])=>any;
    findByObject:(object:any, select?:string[])=>any;
}

export class BaseService {
    // generate updated object formatted JSON to update embedded document
    generateUpdateObject(item:any) {
        var jsonResult = {};
        this.generateEmbeddedObject(item, jsonResult)
        return jsonResult;
    }

    private generateEmbeddedObject(item:any, jsonResult:any, parentPath?:string) {
        for (let prop in item) {
            var propName = prop.toString();
            if (parentPath) {
                propName = parentPath + "." + propName;
            }

            if (_.isObject(item[prop]) && !_.isArray(item[prop])) {
                this.generateEmbeddedObject(item[prop], jsonResult, propName);
            } else {
                jsonResult[propName] = item[prop];
            }
        }
    }

    constructor() {

    }
}