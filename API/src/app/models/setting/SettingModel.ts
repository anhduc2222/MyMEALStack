/**
 * Created by vaduc on 7/25/2016.
 */
import mongoose = require("mongoose");

interface SettingModel extends mongoose.Document {
    type: string;
    account: string;
    user: string;
    key: string;
    value: string;
}

export = SettingModel;