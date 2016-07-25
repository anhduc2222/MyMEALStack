/**
 * Created by vaduc on 7/25/2016.
 */
import mongoose = require("mongoose");

interface SignatureModel extends mongoose.Document {
    signature: string;
}

export = SignatureModel;