"use strict";
/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
var inversify_1 = require("inversify");
var IocConfig = (function () {
    function IocConfig() {
    }
    IocConfig.init = function () {
        var kernel = new inversify_1.Kernel();
        return kernel;
    };
    return IocConfig;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IocConfig.init();
//# sourceMappingURL=IocConfig.js.map