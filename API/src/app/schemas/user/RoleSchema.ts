/**
 * Created by vaduc on 7/25/2016.
 */
import DataAccess = require("../../core/repositories/DataContext");
import RoleModel = require("../../models/user/RoleModel");
import {ROLE} from "../../core/common/FieldName";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class RoleSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            [ROLE.name]: String,
            [ROLE.user]: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            [ROLE.resources._]: [{
                _id: false,
                [ROLE.resources.resource]: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'resources'
                },
                [ROLE.resources.resourceName]: String,
                [ROLE.resources.permissions]: String
            }],
            [ROLE.systemRole]: {
                type: Boolean,
                default: false
            },
            [ROLE.modified]: {
                type: Date,
                default: Date.now
            },
            [ROLE.modifiedBy]: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            [ROLE.created]: {
                type: Date,
                default: Date.now
            },
            [ROLE.createdBy]: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        });
        return schema;
    }
}

var schema = mongooseConnection.model<RoleModel>('roles', RoleSchema.schema, 'roles');
export = schema;