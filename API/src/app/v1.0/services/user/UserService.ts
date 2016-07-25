/**
 * Created by vaduc on 7/25/2016.
 */
import "reflect-metadata";
import {injectable, inject} from "inversify";
import {validate} from "../../../core/common/Decorators";
import {USER} from "../../../core/common/FieldName";
import {STATUS} from "../../../core/common/ResourceType";
var _ = require("lodash");
import Q = require("q");

import UserRepository = require("../../repositories/user/UserRepository");
import RoleRepository = require("../../repositories/user/RoleRepository");
import TokenRepository = require("../../repositories/authorization/TokenRepository");
import RedisContext = require("../../../core/repositories/RedisContext");

import UserModel = require("../../../models/user/UserModel");
import TokenModel = require("../../../models/authorization/TokenModel");

import IBaseService = require("../../../core/services/IBaseService");
import TokenService = require("../../services/authorization/TokenService");
import SettingService = require("../../services/setting/SettingService");

import ERROR = require("../../../core/common/ErrorCode");
import ERROR_HELPER = require("../../../core/utils/ErrorHelper");

import spread = Q.spread;

@injectable()
class UserService {
    private _userRepository:UserRepository;
    private _roleRepository:RoleRepository;
    private _tokenRepository:TokenRepository;
    private _settingService:SettingService;
    private _tokenService:TokenService;

    private _redis;

    constructor(@inject("UserRepository")userRepository:UserRepository,
                @inject("RoleRepository")roleRepository:RoleRepository,
                @inject("TokenRepository")tokenRepository:TokenRepository,
                @inject("RedisContext")redisContext:RedisContext,
                @inject("TokenService")tokenService:TokenService,
                @inject("SettingService")settingService:SettingService) {
        this._userRepository = userRepository;
        this._roleRepository = roleRepository;
        this._tokenRepository = tokenRepository;
        this._tokenService = tokenService;
        this._settingService = settingService;
        this._redis = redisContext;
    }

    findByEmail(email:string, accountId?:string):any {
        if (accountId)
            return this._userRepository.findOne({'email': email, 'whitelabel': accountId});
        else
            return this._userRepository.findOne({'email': email});
    }
}

export = UserService;