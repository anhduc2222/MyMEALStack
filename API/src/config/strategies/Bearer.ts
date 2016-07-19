/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
import passport = require('passport');
import Q = require('q');
var _ = require('lodash');
var BearStrategy = require('passport-http-bearer');

class BearerStrategies {

    static bearerRegister() {

        var bearStrategy = BearStrategy.Strategy;
        passport.use('access', new bearStrategy());
    }
}

Object.seal(BearerStrategies);
export = BearerStrategies;