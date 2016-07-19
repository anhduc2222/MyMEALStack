/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../typings/index.d.ts" />
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var RouteRegistration = require('../app/routes/RouteRegistration');
var passport = require("passport");
var requestId = require('request-id/express');
// var morgan = require('morgan');
var Configuration = (function () {
    function Configuration() {
    }
    Object.defineProperty(Configuration, "setup", {
        get: function () {
            var app = express();
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
            app.use(methodOverride());
            app.use(express.static('.'));
            app.use(requestId());
            //region setup the logger
            // app.use(morgan('combined', {stream: LogAccess.stream}));
            // app.use(LogRequest.log);
            // app.use(LogRequestBody.log);
            //endregion
            // Register passport
            app.use(passport.initialize());
            app.use(passport.session());
            // Register Route
            RouteRegistration.register(app);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Configuration;
}());
Object.seal(Configuration);
module.exports = Configuration;
//# sourceMappingURL=Configuration.js.map