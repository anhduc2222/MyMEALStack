"use strict";
/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
var passport = require('passport');
var _ = require('lodash');
var BearStrategy = require('passport-http-bearer');
var BearerStrategies = (function () {
    function BearerStrategies() {
    }
    BearerStrategies.bearerRegister = function () {
        var bearStrategy = BearStrategy.Strategy;
        passport.use('access', new bearStrategy());
    };
    return BearerStrategies;
}());
Object.seal(BearerStrategies);
module.exports = BearerStrategies;
//# sourceMappingURL=Bearer.js.map