/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import { injectable } from "inversify";

import TokenModel = require("../../../models/authorization/TokenModel");
import TokenSchema = require("../../../schemas/authorization/TokenSchema");
import RepositoryBase = require("../../../core/repositories/RepositoryBase");
import ERROR = require("../../../core/common/ErrorCode");

@injectable()
class TokenRepository extends RepositoryBase<TokenModel> {
    constructor() {
        super(TokenSchema);
    }
}

Object.seal(TokenRepository);
export = TokenRepository;