/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import {injectable} from "inversify";

import RoleModel = require("../../../models/user/RoleModel");
import RoleSchema = require("../../../schemas/user/RoleSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");

@injectable()
class RoleRepository extends RepositoryBase<RoleModel> {
    constructor() {
        super(RoleSchema);
    }

    findByName(name:string):any {
        return RoleSchema.findOne({name: name}).exec();
    }
}

Object.seal(RoleRepository);
export = RoleRepository;