/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import { injectable, inject } from "inversify";
var _ = require("lodash");

import NonceRepository = require("../../repositories/authorization/NonceRepository");
import NonceModel = require("../../../models/authorization/NonceModel");

@injectable()
class NonceService {
    private _nonceRepository: NonceRepository;

    constructor(@inject("NonceRepository")nonceRepository:NonceRepository) {
        this._nonceRepository = nonceRepository;
    }

    create(item: NonceModel) {
        return this._nonceRepository.create(item);
    }
}

export = NonceService;