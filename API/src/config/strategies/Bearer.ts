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

class BearerStrategies {

    static bearerRegister() {
        var iocContainer = kernel;
        var bearStrategy = BearStrategy.Strategy;
        passport.use('access', new bearStrategy({"passReqToCallback": true}, (req, token, done) => {

            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');
        }));

        passport.use('auth', new bearStrategy({"passReqToCallback": true}, (req, token, done) => {

            var reqSignature = req.get('Signature');
            var reqTimestamp = req.get('Timestamp');
            var reqNonce = req.get('Nonce');
            var host = req.get('host');
            let whiteLabelAccountId = null;
            Q.call(() => {
                if (_.indexOf(host, '.com') !== 1)
                    return null;
                let domain = 'kfc.test.com.au';
                let subDomain = domain.split('.mgl.com.au')[0];
            });
        }));
    }
}

Object.seal(BearerStrategies);
export = BearerStrategies;