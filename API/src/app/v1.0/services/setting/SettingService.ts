/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import {injectable, inject} from "inversify";
import Q = require("q");
import sass = require('node-sass');
var _ = require("lodash");

import SettingModel = require("../../../models/setting/SettingModel");
import SettingRepository = require("../../repositories/setting/SettingRepository");
import ERROR = require("../../../core/common/ErrorCode");

@injectable()
class SettingService {
    private _settingRepository:SettingRepository;

    constructor(@inject("SettingRepository")settingRepository:SettingRepository) {
        this._settingRepository = settingRepository;
    }
}

export = SettingService;