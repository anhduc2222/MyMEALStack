/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import {injectable, inject} from "inversify";

import {TOKEN} from "../../../core/common/FieldName";
import TokenModel = require("../../../models/authorization/TokenModel");
import TokenRepository = require("../../repositories/authorization/TokenRepository");
import ERROR = require("../../../core/common/ErrorCode");
var _ = require("lodash");

@injectable()
class TokenService {
    private _tokenRepository:TokenRepository;

    constructor(@inject("TokenRepository")tokenRepository:TokenRepository) {
        this._tokenRepository = tokenRepository;
    }

    findById(id:string):any {
        return this._tokenRepository.findById(id);
    }

    findByToken(token:string):any {
        return this._tokenRepository.findByProperty([TOKEN.token].toString(), token, null, true, true);
    }

    create(item:any):any {
        return this._tokenRepository.create(item);
    }

    update(item:any):any {
        return this._tokenRepository.findByIdAndUpdate(item);
    }

    delete(_id:string):void {
        return this._tokenRepository.deleteById(_id);
    }

    logout(userId:string):any {
        this._tokenRepository.update({[TOKEN.user]: userId}, {
            $set: {
                [TOKEN.hardExpiry]: new Date(),
                [TOKEN.softExpiry]: new Date()
            }
        }).then((res)=> {
            if (res != null) {
                return res;
            } else {
                throw ERROR.VALIDATION.KEY_NOT_FOUND;
            }
        });
    }

    setTokenExpiration(userId:string):any {
        return this._tokenRepository.update(
            {[TOKEN.user]: userId, [TOKEN.hardExpiry]: {$gt: Date.now()}},
            {$set: {[TOKEN.hardExpiry]: Date.now()}},
            {multi: true}
        );
    }

    setTokenExpirationWithUserIds(userIds:string):any {
        return this._tokenRepository.update(
            {[TOKEN.user]: {$in: userIds}, [TOKEN.hardExpiry]: {$gt: Date.now()}},
            {$set: {[TOKEN.hardExpiry]: Date.now()}},
            {multi: true}
        );
    }
}

export = TokenService;