/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import { injectable, inject } from "inversify";

import SignatureModel = require("../../../models/authorization/SignatureModel");
import SignatureSchema = require("../../../schemas/authorization/SignatureSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");

@injectable()
class SignatureRepository extends RepositoryBase <SignatureModel> {
    constructor() {
        super(SignatureSchema);
    }
}

Object.seal(SignatureRepository);
export = SignatureRepository;