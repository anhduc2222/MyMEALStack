/**
 * Created by vaduc on 7/25/2016.
 */
import DataAccess = require("./../../core/repositories/DataContext");
import NonceModel = require("./../../models/authorization/NonceModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class NonceSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            nonce: {
                type: String,
                unique: true
            }
        });
        return schema;
    }
}

var schema = mongooseConnection.model<NonceModel>('nonces', NonceSchema.schema, 'nonces');
export = schema;