/**
 * Created by vaduc on 7/25/2016.
 */
import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
    email: string;
    password: string;
    avatar: string;
    firstName: string;
    lastName: string;
    phone: string;
    title: string;
    status: string;
    roles: string[];
}
export = UserModel;