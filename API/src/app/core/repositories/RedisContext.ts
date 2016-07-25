/**
 * Created by vaduc on 7/25/2016.
 */
/// <reference path="../../../../node_modules/inversify/type_definitions/inversify/inversify.d.ts" />
import "reflect-metadata";
import { injectable } from "inversify";
import Redis = require('redis');
import Q = require('q');

@injectable()
class RedisContext {
    private _redisClient;

    constructor() {
    }

    connect():Redis.RedisClient {
        var redisHost = process.env.CACHE_REDIS_HOST;
        var redisPort = process.env.CACHE_REDIS_PORT;
        var redisClient = Redis.createClient(redisPort, redisHost);
        setTimeout(() => {
            redisClient.on('error', (err) => {
                console.log('redis is still waiting for connecting...');
            });
        }, 1000);
        return redisClient;
    }

    get(key:string):any {
        var defer = Q.defer();
        var isConnected = false;
        setTimeout(() => {
            this._redisClient.get(key, (err, reply) => {
                if (reply)
                    defer.resolve(JSON.parse(reply));
                else
                    defer.reject(err);
            });
        }, 1000);
        if (!isConnected)
            defer.resolve(null);
        return defer.promise;
    }

    set(key:string, value:any) {
        //if (this._redisClient.connected) {
        //TODO: check connected status is not correct, must have a callback when connecting to redis, then get/set value
        var defer = Q.defer();
        var isConnected = false;
        setTimeout(() => {
            this._redisClient.set(key, JSON.stringify(value), (err, reply) => {
                if (reply) {
                    isConnected = true;
                    defer.resolve(reply);
                }
                else {
                    defer.reject(err);
                }
            });
        }, 1000);
        if (!isConnected)
            defer.resolve({error_message: 'disconnected from redis'});
        return defer.promise;
    }
}