/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../typings/index.d.ts" />
import express = require("express");
var compression = require("compression");
// import PubnubServer = require("./PubnubServer");
require("dotenv").config();

import Vault = require("./config/vault/Vault");

if (process.env.NODE_ENV == 'DEV') {
    startServer();
} else {
    var vault = new Vault();

    vault.read("DB_CONNECTION_STRING").then((res) => {
        console.log("config: " + res.value);
        process.env.DB_CONNECTION_STRING = res.value;
        console.log(process.env.DB_CONNECTION_STRING);

        startServer();
    }, (err) => {
        console.log("Error when get config:" + err);
    });
}

function startServer() {
    console.log(process.env.DB_CONNECTION_STRING);
    console.log(process.env.NODE_ENV);
    var app = express();
    var port = parseInt(process.env.NODE_PORT, 1111) || 1111;
    app.set('port', port);

    var Configuration = require("./config/Configuration");
    var PassportConfiguration = require("./config/PassportConfiguration");
    PassportConfiguration.register();
    app.use(Configuration.setup);
    app.use(compression());
    app.listen(port, () => {
        console.log("Node app is running at localhost:" + port);
    });

    // PubnubServer.init();
}