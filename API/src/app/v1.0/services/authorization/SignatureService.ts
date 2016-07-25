/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import { injectable, inject } from "inversify";
var _ = require("lodash");

import SignatureRepository = require("../../repositories/authorization/SignatureRepository");
import SignatureModel = require("../../../models/authorization/SignatureModel");

@injectable()
class SignatureService {
    private _signatureRepository:SignatureRepository;

    constructor(@inject("SignatureRepository")signatureRepository:SignatureRepository) {
        this._signatureRepository = signatureRepository;
    }

    create(item: SignatureModel) {
        return this._signatureRepository.create(item);
    }
}

export = SignatureService;