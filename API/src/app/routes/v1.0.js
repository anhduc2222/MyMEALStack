"use strict";
/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
var express = require('express');
var IocConfig_1 = require("./v1.0/IocConfig");
var V1RouteRegistration = (function () {
    function V1RouteRegistration() {
    }
    V1RouteRegistration.register = function () {
        var iocContainer = IocConfig_1.default;
        var router = express.Router();
        return router;
    };
    return V1RouteRegistration;
}());
module.exports = V1RouteRegistration;
//# sourceMappingURL=v1.0.js.map