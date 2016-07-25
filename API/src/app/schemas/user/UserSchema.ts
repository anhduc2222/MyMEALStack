/**
 * Created by vaduc on 7/25/2016.
 */
import DataAccess = require("../../core/repositories/DataContext");
import UserModel = require("../../models/user/UserModel");
import {SCHEMA} from "../../core/common/ResourceType";
import {USER} from "../../core/common/FieldName";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            [USER.email]: {
                type: String,
                unique: true,
                index: true,
                match: /.+@.+\..+/,
                lowercase: true,
                trim: true
            },
            [USER.password]: String,
            [USER.avatar]: String,
            [USER.firstName]: String,
            [USER.lastName]: String,
            [USER.fullName]: String,
            [USER.phone]: String,
            [USER.title]: {
                type: String,
                enum: ['Mr', 'Ms', 'Mrs']
            },
            [USER.lastLogin]: {
                type: Date
            },
            [USER.modified]: Date,
            [USER.status]: SCHEMA.STATUS_TYPE,
            [USER.created]: {
                type: Date,
                default: Date.now
            },
            roles: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'roles',
                required: true
            }],
        });
        schema.pre('save', function (next) {
            var self = this;
            self.fullName = !self.firstName && !self.lastName ? '' : !self.lastName ? self.lastName : '' + ' ' + !self.firstName ? self.firstName : '';
            next();
        });
        return schema;
    }
}

var schema = mongooseConnection.model('users', UserSchema.schema, 'users');
export = schema;