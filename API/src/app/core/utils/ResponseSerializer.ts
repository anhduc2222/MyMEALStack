/**
 * Created by vaduc on 7/25/2016.
 */
import Q = require("q");
var _ = require("lodash");
import express = require("express");
import {HTTP_STATUS_CODE} from "../../core/common/HttpStatusCode";
import ERROR_CODE = require("../../core/common/ErrorCode");

module ResponseSerializer {
    export function createItemResult(resource:string, item:Object):any {
        return {
            data: item,
            meta: {'type': resource}
        }
    }
    
    export function createListResult(resource:string, req: express.Request, count:number, items:Object[]):any {
        var baseRoute = req.originalUrl;
        var page = req.query.page;
        var pageSize = req.query.pageSize;
        items.forEach((it, index) => {
            items[index] = {
                data: it,
                meta: {'type': resource}
            };
        });
        
        if (page) {
            var totalPage = Math.ceil(count / pageSize);
            page = page < 1 ? 1 : page > totalPage ? totalPage : page;
            baseRoute = baseRoute.replace(/pageSize=\d*/, 'pageSize=' + pageSize);
            
            var links = {
                totalPage: totalPage,
                self: baseRoute.replace(/page=\d*/, 'page=' + page),
                firstPage: baseRoute.replace(/page=\d*/, 'page=' + 1),
                prevPage: baseRoute.replace(/page=\d*/, 'page=' + (page - 1 < 1 ? 1 : page - 1)),
                nextPage: baseRoute.replace(/page=\d*/, 'page=' + (page + 1 > totalPage ? totalPage : page + 1)),
                lastPage: baseRoute.replace(/page=\d*/, 'page=' + totalPage)
            };

            if (page == 1) {
                delete links['prevPage'];
            } else if (page == totalPage) {
                delete links['nextPage'];
            }
            return {
                items: items,
                meta: {
                    'type': 'collection',
                    count: count || null,
                    links: links
                }
            }
        }
        else {
            return {
                items: items,
                meta: {
                    'type': 'collection',
                    count: count || null,
                    links: {
                        self: baseRoute,
                    }
                }
            }
        }
    }

    export function createExceptionResult(errorResourceDefault:any, errors:any):any {
        return this.createErrorResult(errorResourceDefault, errors, HTTP_STATUS_CODE.SERVER_ERROR);
    }

    export function createErrorResult(errorResourceDefault:any, errors:any, httpStatus:number = HTTP_STATUS_CODE.VALIDATION_FAILED):any {
        if (errors.resource) {
            return {
                errors: {
                    error: {
                        resource: errors.resource == '_' ? errorResourceDefault.resource : errors.resource,
                        field: errors.field,
                        code: errors.code,
                        message: errors.message,
                        details: errors.details
                    },
                    meta: {'type': 'error'}
                },
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ''
                }
            };
        }
        else if (errors.name == "ValidationError") {
            var ltErrors = [];
            for (var field in errors.errors) {
                var err:any = errors.errors[field];
                ltErrors.push({
                    error: {
                        resource: errorResourceDefault.resource,
                        field: err.path,
                        code: errorResourceDefault.code,
                        message: err.message
                    },
                    meta: {'type': 'error'}
                });
            }
            return {
                errors: ltErrors,
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ''
                }
            };
        }
        else if (errors.name == 'CastError' || errors.name == 'MongoError') {
            return {
                errors: {
                    error: {
                        resource: errorResourceDefault.resource,
                        code: errorResourceDefault.code,
                        message: errors.message
                    },
                    meta: {'type': 'error'}
                },
                meta: {
                    "type": "collection",
                    httpStatus: httpStatus,
                    logRef: ''
                }
            };
        }
        else {
            return {
                errors: {
                    error: {
                        resource: errorResourceDefault.resource,
                        code: errorResourceDefault.code,
                        message: errors.message
                    },
                    meta: {'type': 'error'}
                },
                meta: {
                    "type": "collection",
                    httpStatus: HTTP_STATUS_CODE.SERVER_ERROR,
                    logRef: ''
                }
            };
        }
    }
}

export = ResponseSerializer;