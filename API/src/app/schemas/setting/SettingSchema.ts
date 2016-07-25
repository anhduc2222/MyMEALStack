/**
 * Created by vaduc on 7/20/2016.
 */
import DataAccess = require("../../core/repositories/DataContext");
import SettingModel = require("../../models/setting/SettingModel");
import {SCHEMA} from "../../core/common/ResourceType";

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SettingSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            type: SCHEMA.SETTING_TYPE,
            link : mongoose.Schema.Types.ObjectId,
            key: SCHEMA.SETTING_KEY_TYPE,
            value: String
        });

        return schema;
    }
}

var schema = mongooseConnection.model<SettingModel>('settings', SettingSchema.schema, 'settings');
export = schema;