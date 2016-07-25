/**
 * Created by vaduc on 7/25/2016.
 */
/// <reference path="../../../../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
import "reflect-metadata";
import mongoose = require("mongoose");
import {injectable} from "inversify";

import UserModel = require("../../../models/user/UserModel");
import UserSchema = require("../../../schemas/user/UserSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");
import ERROR = require("../../../core/common/ErrorCode");
import Q = require("q");

@injectable()
class UserRepository extends RepositoryBase<UserModel> {
    constructor() {
        super(UserSchema);
    }

    findByIdAndPopulateResourcesPermissions(id:string, selectedFields?:string[]):any {
        let query = UserSchema.findOne({_id: id})
            .populate('roles');

        if (selectedFields)
            query.select(selectedFields.join(' ')).lean();
        return query.exec().then((res) => {
            if (res != null) {
                return res;
            } else {
                throw ERROR.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }

    getUserByRole(roleId:string):any {
        return UserSchema.find({
            "roles": {
                "$elemMatch": {
                    $eq: roleId
                }
            }
        }).exec();
    }

    getUsersIncludedLastAccess(page?:number, pageSize:number = 10, filter?:any, select?:string[], sortBy?:any):any {
        return Q.fcall(()=> {
            if (sortBy.lastAccess) {
                sortBy['lastAccess'] = sortBy.lastAccess === "asc" ? 1 : -1;
                delete sortBy.lastAccess;
            }

            let query = UserSchema.find(filter[0].listFilterData);

            if (filter) {
                query = query.find(filter[1].listFilterData);
            }

            if (sortBy) {
                query = query.sort(sortBy);
            }

            if (page) {
                query = query.skip((page - 1) * pageSize);
                query = query.limit(pageSize);
            }

            return [UserSchema.find(filter[0].listFilterData).find(filter[1].listFilterData).count().exec(), query.lean().exec()];
        }).spread((t, e)=> {
            return [t, UserSchema.populate(e, {path: 'roles', select: 'name -_id'})];
        });
    }
}

Object.seal(UserRepository);
export = UserRepository;