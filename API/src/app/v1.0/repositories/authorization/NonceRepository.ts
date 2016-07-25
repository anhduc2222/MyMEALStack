/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import { injectable, inject } from "inversify";

import NonceModel = require("../../../models/authorization/NonceModel");
import NonceSchema = require("../../../schemas/authorization/NonceSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");

@injectable()
class NonceRepository extends RepositoryBase<NonceModel> {
    constructor() {
        super(NonceSchema);
    }
}

Object.seal(NonceRepository);
export = NonceRepository;