/**
 * Created by vaduc on 7/20/2016.
 */
/// <reference path="../../../../typings/index.d.ts" />
var crypToJS = require("crypto-js");
var urlEncode = require('urlencode');

class Authorization {
    static GenerateSignature(req, token, secret) {
        // Get URL path from original URL
        var path = req.originalUrl.split('?');
        path = path[0];
        var nonce = req.get('Nonce');
        // Construct the urlencoded base string in the form: Method & URL Path & Timestamp & Nonce & Body
        var baseString;

        baseString = urlEncode(req.method) + '&' +
            urlEncode(path) + '&' +
            urlEncode(req.get('Timestamp')) + '&' +
            urlEncode(nonce) + '&' +
            urlEncode(JSON.stringify(this.kSort(req.body)));

        var signature = crypToJS.HmacSHA1(baseString, token + '&' + secret);
        signature = signature.toString(crypToJS.enc.Base64);

        return signature;
    }

    static kSort(obj) {
        var keys = Object.keys(obj).sort(),
            sortedObj = {};
        for (var i in keys) {
            if (keys.hasOwnProperty(i)) {
                if (Object.prototype.toString.call(obj[keys[i]]) === "[object Array]" || typeof obj[keys[i]] === "object") {
                    obj[keys[i]] = this.kSort(obj[keys[i]]);
                }
                sortedObj[keys[i]] = obj[keys[i]];
            }
        }
        return sortedObj;
    }
}

Object.seal(Authorization);
export = Authorization;