/**
 * Created by vaduc on 7/25/2016.
 */
import DataAccess = require("./../../core/repositories/DataContext");
import TokenModel = require("./../../models/authorization/TokenModel");
var hat = require("hat");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

import {JsonParser} from "../../core/common/MongoosePlugin";

class TokenSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            token: {
                type: String,
                unique: true,
                index: true
            },
            secret: {
                type: String,
                unique: true
            },
            softExpiry: {
                type: Date,
                default: new Date(new Date().setHours(new Date().getHours() + 1))
            },
            hardExpiry: {
                type: Date,
                default: new Date(new Date().setDate(new Date().getDate() + 5))
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            account: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'accounts'
            },
            access: [{
                _id: false,
                resource: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'resources'
                },
                resourceName: String,
                permissions: [String]
            }],
            accessChild: {
                type: Boolean,
                default: false
            },
            lastAccess: {
                type: Date,
                default: Date.now()
            },
            session: {
                type: mongoose.Schema.Types.Mixed
            },
            created: {
                type: Date,
                default: Date.now
            }
        });

        schema.pre('save', function (next) {
            var self = this;
            if (!self.token || self.token === '') {
                self.token = hat.rack()();
            }
            if (!self.secret || self.token === '') {
                self.secret = hat.rack()();
            }
            next();
        });
        schema.plugin(JsonParser);
        return schema;
    }
}

var schema = mongooseConnection.model('tokens', TokenSchema.schema, 'tokens');
export = schema;