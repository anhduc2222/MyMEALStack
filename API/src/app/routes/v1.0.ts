/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
import express = require('express');
import kernel from "./v1.0/IocConfig";

class V1RouteRegistration {
    static register() {
        var iocContainer = kernel;
        var router = express.Router();

        return router;
    }
}

export = V1RouteRegistration;