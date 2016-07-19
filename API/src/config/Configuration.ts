/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../typings/index.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import methodOverride = require('method-override');
import RouteRegistration = require('../app/routes/RouteRegistration');
import passport = require("passport");
var requestId = require('request-id/express');
// var morgan = require('morgan');

class Configuration {
    static get setup() {
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
    }
}

Object.seal(Configuration);
export = Configuration;