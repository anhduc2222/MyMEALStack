"use strict";
/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
var passport = require('passport');
var Q = require('q');
var _ = require('lodash');
var BearStrategy = require('passport-http-bearer');
var IocConfig_1 = require("../../app/routes/v1.0/IocConfig");
var Common = require("../../app/core/authorization/Authorization");
var BearerStrategies = (function () {
    function BearerStrategies() {
    }
    BearerStrategies.bearerRegister = function () {
        var iocContainer = IocConfig_1.default;
        var bearStrategy = BearStrategy.Strategy;
        passport.use('access', new bearStrategy({ "passReqToCallback": true }, function (req, token, done) {
            var tokenService = iocContainer.get("TokenService");
            var nonceService = iocContainer.get("NonceService");
            var signatureService = iocContainer.get("SignatureService");
            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');
            Q.all([tokenService.findByToken(token)])
                .spread(function (tokenResult) {
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
                var createdNonce = nonceService.create({ nonce: reqNonce });
                var createdSignature = signatureService.create({ signature: reqSignature });
                return [updatedToken, createdNonce, createdSignature];
            })
                .spread(function (updatedToken, createdNonce, createdSignature) {
                //skip below steps dev environment
                if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST')
                    return done(null, updatedToken, { scope: 'all' });
                //check if updated is ok and created nonce and signature are successful as well
                if (!updatedToken || !createdNonce || !createdSignature) {
                    throw new Error();
                }
                return done(null, updatedToken, { scope: 'all' });
            })
                .catch(function (err) {
                return done(null, false, err);
            });
        }));
        passport.use('public_access', new bearStrategy({ "passReqToCallback": true }, function (req, token, done) {
            var tokenService = iocContainer.get("TokenService");
            Q.all([tokenService.findByToken(token)])
                .spread(function (tokenResult) {
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
                .then(function (updatedToken) {
                //skip below steps dev environment
                if (process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST')
                    return done(null, updatedToken, { scope: 'all' });
                //check if updated is ok and created nonce and signature are successful as well
                if (!updatedToken) {
                    throw new Error();
                }
                return done(null, updatedToken, { scope: 'all' });
            })
                .catch(function (err) {
                return done(null, false, err);
            });
        }));
        passport.use('auth', new bearStrategy({ "passReqToCallback": true }, function (req, token, done) {
            var userService = iocContainer.get("UserService");
            var nonceService = iocContainer.get("NonceService");
            var signatureService = iocContainer.get("SignatureService");
            var tokenService = iocContainer.get("TokenService");
            var settingRepository = iocContainer.get("SettingRepository");
            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');
            var host = req.get('host');
            var whiteLabelAccountId = null;
            Q.fcall(function () {
            });
        }));
    };
    return BearerStrategies;
}());
Object.seal(BearerStrategies);
module.exports = BearerStrategies;
//# sourceMappingURL=Bearer.js.map