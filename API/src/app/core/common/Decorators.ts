/**
 * Created by datrong on 4/16/2016.
 */
var _ = require("lodash");
import "reflect-metadata";
import Q = require("q");
var Logger = require("../logs/Logger");
//TODO: Trong avoid hard the path to version folder
import kernel from "../../routes/v1.0/IocConfig";

import ERROR_CODE = require("../../core/common/ErrorCode");
import ResponseSerializer = require("../../core/utils/ResponseSerializer");
import {HTTP_STATUS_CODE} from "./HttpStatusCode";
import DtoParser = require("../../core/utils/DtoParser");
//TODO: Trong avoid hard the path to version folder
import UserService = require("../../v1.0/services/user/UserService");

module Decorators {
    export function authorize(resource:string, permission:string) {
        return function (target:any, propertyKey:string, descriptor:TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                // check user has permission on resource
                console.log("check user has permission: " + permission + " on resource: " + resource);

                let req = params[0];
                if (!req.user) {
                    throw ERROR_CODE.USER.USER_UNAUTHORIZED;
                }
                // Check user permission
                let userSvc:UserService = kernel.get<UserService>("UserService");
                let self = this;
                return userSvc.checkUserPermission(req.user, resource, permission)
                    .then(() => {
                        return method.apply(self, params);
                    });
            }
        };
    }

    /**
     * parse the dto
     * @param dto
     * @returns {function(any, string, PropertyDescriptor): undefined}
     */
    export function parseDto(dto:any) {
        return function (target:any, propertyKey:string, descriptor:TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                var req = params[0];
                var res = params[1];
                DtoParser.parse(req, dto);
                return method.apply(this, params);
            }
        };
    }

    //region validation
    function addValidation(target:any, propertyKey:string, validationType:string, values?:any[], error?:any) {
        var className = target.getClassName();
        var validationMetadata = Reflect.getMetadata(className, target) || {};
        validationMetadata[propertyKey] = validationMetadata[propertyKey] || [];
        validationMetadata[propertyKey].push({"validationType": validationType, "values": values, "error": error});
        return Reflect.defineMetadata(className, validationMetadata, target);
    }

    export function required(error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "required", null, error);
        };
    }

    export function gt(value:any, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "gt", [value], error);
        };
    }

    export function gte(value:any, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "gte", [value], error);
        };
    }

    export function lt(value:any, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "lt", [value], error);
        };
    }

    export function lte(value:any, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "lte", [value], error);
        };
    }

    export function range(min:any, max:any, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "range", [min, max], error);
        };
    }

    export function inEnum(values:any[], error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "inEnum", values, error);
        };
    }

    export function minLength(length:number, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "minLength", [length], error);
        };
    }

    export function maxLength(length:number, error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "maxLength", [length], error);
        };
    }

    export function email(error?:any) {
        return function (target:any, propertyKey:string) {
            return addValidation(target, propertyKey, "email", null, error);
        };
    }

    export function validateEmbeddedField(target:any, propertyKey:string) {
        return addValidation(target, propertyKey, "validateEmbeddedField");
    }

    export function validateObject(obj:any) {
        // Just validate once the object decorated as validator
        if (!obj.hasOwnProperty('getClassName')) return;

        let validationMetadata = Reflect.getMetadata(obj.getClassName(), obj);
        if (validationMetadata) {
            for (let field of _.keys(validationMetadata)) {
                for (let validationInfo of validationMetadata[field]) {
                    var fieldValue = obj[field];
                    switch (validationInfo.validationType) {
                        case "required" :
                        {
                            if (_.isNil(fieldValue) || (_.isString(fieldValue) && _.trim(fieldValue) === "")) {
                                console.log("Missing Require Field");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_IS_MISSING;
                            }
                            break;
                        }
                        case "gt" :
                        {
                            // Just evaluate when field value is not null or empty
                            if (!_.isNil(fieldValue) && fieldValue <= validationInfo.values[0]) {
                                console.log("Greater than validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_GT_THAN;
                            }
                            break;
                        }
                        case "gte" :
                        {
                            // Just evaluate when field value is not null or empty
                            if (!_.isNil(fieldValue) && fieldValue < validationInfo.values[0]) {
                                console.log("Greater or equal validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_GT_OR_EQ;
                            }
                            break;
                        }
                        case "lt" :
                        {
                            // Just evaluate when field value is not null or empty
                            if (!_.isNil(fieldValue) && fieldValue >= validationInfo.values[0]) {
                                console.log("Lower than validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_LT_THAN;
                            }
                            break;
                        }
                        case "lte" :
                        {
                            // Just evaluate when field value is not null or empty
                            if (!_.isNil(fieldValue) && fieldValue > validationInfo.values[0]) {
                                console.log("Lower or equal validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_LT_OR_EQ;
                            }
                            break;
                        }
                        case "range" :
                        {
                            // Just evaluate when field value is not null or empty
                            var min = validationInfo.values[0];
                            var max = validationInfo.values[1]
                            if (!_.isNil(fieldValue) && (fieldValue < min || fieldValue > max)) {
                                console.log("Range validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_IN_RANGE;
                            }
                            break;
                        }
                        case "inEnum" :
                        {
                            var values = validationInfo.values;
                            // Just evaluate when field value is not null or empty
                            if (!_.isNil(fieldValue) && _.indexOf(values, fieldValue) == -1) {
                                console.log("In Enum validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_IN_ENUM;
                            }
                            break;
                        }
                        case "minLength" :
                        {
                            var minLength = validationInfo.values[0];
                            // Just evaluate when field value is string
                            if (!_.isString(fieldValue) || fieldValue.length < minLength) {
                                console.log("Min Length validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MIN_LENGTH_VIOLATED;
                            }
                            break;
                        }
                        case "maxLength" :
                        {
                            var maxLength = validationInfo.values[0];
                            // Just evaluate when field value is string
                            if (!_.isString(fieldValue) || fieldValue.length > maxLength) {
                                console.log("Max Length validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MAX_LENGTH_VIOLATED;
                            }
                            break;
                        }
                        case "email" :
                        {
                            var regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
                            // Just evaluate when field value is string
                            if (_.isString(fieldValue) && !regex.test(fieldValue)) {
                                console.log("Email validation is violated");
                                throw validationInfo.error || ERROR_CODE.VALIDATION.FIELD_MUST_BE_EMAIL;
                            }
                            break;
                        }
                        case "validateEmbeddedField" :
                        {
                            if (fieldValue) { // only validate if field has value.
                                validateObject(fieldValue); //recursive for embedded object
                            }
                            break;
                        }
                        default:
                            console.log("Validation Type is not support");
                    }
                }
            }
        }
    }

    export function validate(target:any, propertyName:string, descriptor:TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;
        descriptor.value = function (...params) {
            for (let arg of params) {
                if (_.isObject(arg) && !_.isArray(arg)) {
                    validateObject(arg);
                }
            }

            return method.apply(this, params);
        }
    }

    //endregion

    //region result
    export function listResult(resource:string, invalidError:any, exceptionError:any) {
        return function (target:any, propertyName:string, descriptor:TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                try {
                    var req = params[0];
                    var res = params[1];
                    if (req.query != null && req.query.page != null) {
                        req.query.page = parseInt(req.query.page);
                        req.query.pageSize = parseInt(req.query.pageSize);
                    }
                    method.apply(this, params)
                        .spread((count, result) => {
                            sendResponse('info', HTTP_STATUS_CODE.OK, ResponseSerializer.createListResult(resource, req, count || result.length, result), req, res);
                        }, (err) => {
                            var rsError = ResponseSerializer.createErrorResult(invalidError, err);
                            sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                        });

                } catch (e) {
                    var rsError = ResponseSerializer.createExceptionResult(exceptionError, e);
                    sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                }
            }
        }
    }

    export function itemResult(resource:string, invalidError:any, exceptionError:any) {
        return function (target:any, propertyName:string, descriptor:TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                try {
                    var req = params[0];
                    var res = params[1];
                    method.apply(this, params)
                        .then((result) => {
                            res.json(ResponseSerializer.createItemResult(resource, result));
                            sendResponse('info', HTTP_STATUS_CODE.OK, ResponseSerializer.createItemResult(resource, result), req, res);
                        }, (err) => {
                            var rsError = ResponseSerializer.createErrorResult(invalidError, err);
                            sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                        });

                } catch (e) {
                    var rsError = ResponseSerializer.createExceptionResult(exceptionError, e);
                    sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                }
            }
        }
    }

    export function emptyResult(httpStatus:any, invalidError:any, exceptionError:any) {
        return function (target:any, propertyName:string, descriptor:TypedPropertyDescriptor<Function>) {
            let method = descriptor.value;
            descriptor.value = function (...params) {
                try {
                    var req = params[0];
                    var res = params[1];
                    method.apply(this, params)
                        .then(() => {
                            sendResponse('info', httpStatus, '', req, res);
                        }, (err) => {
                            let rsError = ResponseSerializer.createExceptionResult(invalidError, err);
                            sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                        });
                } catch (e) {
                    let rsError = ResponseSerializer.createExceptionResult(exceptionError, e);
                    sendResponse('error', rsError.meta.httpStatus, rsError, req, res);
                }
            }
        }
    }

    //endregion

    function sendResponse(level, status, dataResponse, req, res) {
        //region send response
        res.status(status).json(dataResponse);
        //endregiona

        if (level == 'error') {
            Logger.error(dataResponse);
        }
    }
}

export = Decorators;