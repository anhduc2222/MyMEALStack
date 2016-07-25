/**
 * Created by vaduc on 7/25/2016.
 */
import mongoose = require("mongoose");

interface RoleModel extends mongoose.Document {
    name: string;
    user: string;
    resources: [{
        resourceId: string,
        resourceName: string,
        permissions: string[];
    }];
    created: Date;
}

export = RoleModel;