/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
"use strict";
var vault = require("vaultedmod");
var VaultConfiguration = (function () {
    function VaultConfiguration() {
        'use strict';
        console.log("Vault host: " + process.env.VAULT_SERVICE_HOST);
        console.log("Vault port: " + process.env.VAULT_SERVICE_PORT);
        var vaultHost = process.env.VAULT_SERVICE_HOST;
        var vaultPort = process.env.VAULT_SERVICE_PORT;
        var myVault = new vault({
            vault_host: vaultHost,
            vault_port: vaultPort,
            vault_ssl: false,
            vault_token: 'nope'
        });
        this._vault = myVault.setInitialized()
            .setStatus({ sealed: false })
            .appLogin({
            body: {
                app_id: process.env.VAULT_APP_ID,
                user_id: process.env.VAULT_USER_ID
            }
        })
            .then(function (client_token) {
            myVault.setToken(client_token.auth.client_token);
            return myVault;
        }).catch(function (err) {
            console.log(err);
            return err;
        });
    }
    VaultConfiguration.prototype.write = function (key, value) {
        return this._vault.then(function (vault) {
            return vault.write({
                id: key,
                body: {
                    value: value
                }
            });
        }).catch(function (err) {
            return err;
        });
    };
    VaultConfiguration.prototype.read = function (key) {
        return this._vault.then(function (vault) {
            return vault.read({ id: key });
        }).then(function (result) {
            if (result)
                return result.data;
            return '';
        });
    };
    return VaultConfiguration;
}());
module.exports = VaultConfiguration;
