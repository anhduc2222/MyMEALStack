"use strict";
/**
 * Created by vaduc on 7/19/2016.
 */
var BearerStrategies = require("./strategies/Bearer");
var PassportConfig = (function () {
    function PassportConfig() {
    }
    PassportConfig.register = function () {
        BearerStrategies.bearerRegister();
    };
    return PassportConfig;
}());
Object.seal(PassportConfig);
module.exports = PassportConfig;
