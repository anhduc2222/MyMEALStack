/**
 * Created by vaduc on 7/25/2016.
 */
import mongoose = require("mongoose");

interface NonceModel extends mongoose.Document {
    nonce: string;
}

export = NonceModel;