/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
import passport = require('passport');
import Q = require('q');
var _ = require('lodash');
var BearStrategy = require('passport-http-bearer');
import kernel from "../../app/routes/v1.0/IocConfig";

import Common = require("../../app/core/authorization/Authorization");

import SettingRepository = require("../../app/v1.0/repositories/setting/SettingRepository");
import TokenService = require("../../app/v1.0/services/authorization/TokenService");
import SignatureService = require("../../app/v1.0/services/authorization/SignatureService");
import NonceService = require("../../app/v1.0/services/authorization/NonceService");
import SignatureModel = require("../../app/models/authorization/SignatureModel");
import NonceModel = require("../../app/models/authorization/NonceModel");
import UserService = require("../../app/v1.0/services/user/UserService");

class BearerStrategies {

    static bearerRegister() {
        var iocContainer = kernel;
        var bearStrategy = BearStrategy.Strategy;
        passport.use('access', new bearStrategy({"passReqToCallback": true}, (req, token, done) => {
            var tokenService = iocContainer.get<TokenService>("TokenService");
            var nonceService = iocContainer.get<NonceService>("NonceService");
            var signatureService = iocContainer.get<SignatureService>("SignatureService");

            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');

            Q.all([tokenService.findByToken(token)])
                .spread((tokenResult) => {
                    /**
                     * By passs
                     */
                    if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST') {
                        tokenResult.softExpiry =
                            new Date(tokenResult.softExpiry.setHours(tokenResult.softExpiry.getHours()
                            + parseInt(process.env.SOFT_EXTEND_TIME_TOKEN)));
                        tokenResult.lastAccess = Date.now();
                        var updatedTokenDev = tokenService.update(tokenResult);
                        return [updatedTokenDev, 'ok', 'ok'];
                    }

                    //check if already existed nonce and signature return error
                    if (!tokenResult) {
                        throw new Error();
                    }

                    //generate from token and secret and check signature if it's correct
                    var signature = Common.GenerateSignature(req, tokenResult.token, tokenResult.secret);
                    if (signature !== reqSignature) {
                        throw new Error();
                    }

                    //check if expiry
                    if (tokenResult.softExpiry < new Date() && tokenResult.softExpiry >= tokenResult.hardExpiry) {
                        throw new Error();
                    }

                    //check timestamp - request is longer 30s => false
                    if (!reqTimestamp) {
                        throw new Error();
                    }
                    var currentTimestamp = Math.floor(Date.now() / 1000);

                    if (currentTimestamp - reqTimestamp > 30) {
                        throw new Error();
                    }

                    //Update token
                    tokenResult.softExpiry = new Date(tokenResult.softExpiry.setHours(tokenResult.softExpiry.getHours() + parseInt(process.env.SOFT_EXTEND_TIME_TOKEN)));
                    tokenResult.lastAccess = Date.now();

                    ////save updated token, insert new nonce and new signature to db
                    var updatedToken = tokenService.update(tokenResult);
                    var createdNonce = nonceService.create(<NonceModel>{nonce: reqNonce});
                    var createdSignature = signatureService.create(<SignatureModel>{signature: reqSignature});

                    return [updatedToken, createdNonce, createdSignature];
                })
                .spread((updatedToken, createdNonce, createdSignature) => {
                    //skip below steps dev environment
                    if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST')
                        return done(null, updatedToken, {scope: 'all'});

                    //check if updated is ok and created nonce and signature are successful as well
                    if (!updatedToken || !createdNonce || !createdSignature) {
                        throw new Error();
                    }

                    return done(null, updatedToken, {scope: 'all'});
                })
                .catch((err) => {
                    return done(null, false, err);
                });

        }));

        passport.use('public_access', new bearStrategy({"passReqToCallback": true}, (req, token, done) => {
            var tokenService = iocContainer.get<TokenService>("TokenService");
            Q.all([tokenService.findByToken(token)])
                .spread((tokenResult) => {
                    /**
                     * By pass - skip checking for dev environment
                     */
                    if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST') {
                        tokenResult.lastAccess = Date.now();
                        var updatedTokenDev = tokenService.update(tokenResult);
                        return updatedTokenDev;
                    }

                    if (!tokenResult) {
                        throw new Error();
                    }

                    //check if expiry
                    if (new Date() <= tokenResult.hardExpiry) {
                        throw new Error();
                    }
                    //Update token
                    tokenResult.lastAccess = Date.now();

                    ////save updated token, insert new nonce and new signature to db
                    var updatedToken = tokenService.update(tokenResult);
                    return updatedToken;
                })
                .then((updatedToken) => {

                    //skip below steps dev environment
                    if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST')
                        return done(null, updatedToken, {scope: 'all'});

                    //check if updated is ok and created nonce and signature are successful as well
                    if (!updatedToken) {
                        throw new Error();
                    }

                    return done(null, updatedToken, {scope: 'all'});
                })
                .catch((err) => {
                    return done(null, false, err);
                });
        }));

        passport.use('auth', new bearStrategy({"passReqToCallback": true}, (req, token, done) => {
            var userService = iocContainer.get<UserService>("UserService");
            var nonceService = iocContainer.get<NonceService>("NonceService");
            var signatureService = iocContainer.get<SignatureService>("SignatureService");
            var tokenService = iocContainer.get<TokenService>("TokenService");

            var settingRepository = iocContainer.get<SettingRepository>("SettingRepository");

            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');
            var host = req.get('host');
            let whiteLabelAccountId = null;

            Q.fcall(()=> {
            });
        }));
    }
}

Object.seal(BearerStrategies);
export = BearerStrategies;