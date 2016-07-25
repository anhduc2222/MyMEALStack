/**
 * Created by vaduc on 7/25/2016.
 */
import DataAccess = require("./../../core/repositories/DataContext");
import SignatureModel = require("./../../models/authorization/SignatureModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class SignatureSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            signature: {
                type: String,
                unique: true
            }
        });
        return schema;
    }
}

var schema = mongooseConnection.model<SignatureModel>('signatures', SignatureSchema.schema, 'signatures');
export = schema;