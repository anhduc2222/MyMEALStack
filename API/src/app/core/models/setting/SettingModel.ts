/**
 * Created by vaduc on 7/20/2016.
 */
/// <reference path="../../../../../typings/index.d.ts" />
import mongoose = require("mongoose");

interface SettingModel extends mongoose.Document {
    type: string;
    account: string;
    user: string;
    key: string;
    value: string;
}

export = SettingModel;