/**
 * Created by vaduc on 7/20/2016.
 */
/// <reference path="../../../../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
import "reflect-metadata";
import {injectable} from "inversify";

import SettingModel = require("../../../models/setting/SettingModel");
import SettingSchema = require("../../../schemas/setting/SettingSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");

@injectable()
class SettingRepository extends RepositoryBase<SettingModel> {
    constructor() {
        super(SettingSchema);
    }
}

Object.seal(SettingRepository);
export = SettingRepository;