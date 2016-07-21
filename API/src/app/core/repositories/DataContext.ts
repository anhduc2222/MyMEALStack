/**
 * Created by vaduc on 7/20/2016.
 */
import Mongoose = require("mongoose");
import Q = require("q")
import Promise = Q.Promise;
import Vault = require("../../../config/vault/Vault");

class DataAccess {
    static mongooseInstance:any;
    static mongooseConnection:Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }
    
    static connect():Mongoose.Connection {
        //console.log("Begin connecting to db...");
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection = Mongoose.connection;

        // this.mongooseConnection.db
        // this.mongooseConnection.db.promiseLibrary = require('q').Promise;
        // {options: {db: {promiseLibrary: require('q').Promise}}},
        this.mongooseConnection.once("open", () => {
                console.log("Connecting....");
            }
        );
        // Mongoose.Promise = require('q').Promise; //TODO: Tin Check again

        var connectionString = 'mongodb://' + process.env.DB_CONNECTION_STRING + '/sanity';
        console.log("connection String: " + process.env.DB_CONNECTION_STRING);
        this.mongooseInstance = Mongoose.connect(connectionString, {db: {promiseLibrary: Promise}}, (err) => {
            if (err)
                console.log(err);
        });
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;