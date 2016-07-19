/**
 * Created by vaduc on 7/19/2016.
 */
/// <reference path="../../../typings/index.d.ts" />
"use strict";
var vault = require("vaultedmod");

class VaultConfiguration {
    private _vault;

    constructor() {
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
            .setStatus({sealed: false})
            .appLogin({
                body: {
                    app_id: process.env.VAULT_APP_ID,
                    user_id: process.env.VAULT_USER_ID
                }
            })
            .then((client_token) => {
                myVault.setToken(client_token.auth.client_token);
                return myVault;
            }).catch((err) => {
                console.log(err);
                return err;
            });
    }

    write(key:string, value:any):void {
        return this._vault.then((vault) => {
            return vault.write({
                id: key,
                body: {
                    value: value
                }
            });
        }).catch((err) => {
            return err;
        });
    }

    read(key:string):any {
        return this._vault.then((vault) => {
            return vault.read({id: key});
        }).then((result) => {
            if (result)
                return result.data;
            return '';
        });
    }
}
export = VaultConfiguration;