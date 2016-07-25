import {
    CURRENCY_TYPE, STATUS, SETTING_TYPE, SETTING_KEY, COMMUNICATION_TYPE,
    COMMUNICATION_STATUS, BOUNCE_TYPE, TIMELINE_ACTION_TYPE, RECIPIENT_ACTION_TYPE, BOUNCE_CATEGORY_TYPE, NOTIFY_TYPE,
    TRANSACTION_TYPE, GENDER, CONTACT_FIELD_TYPE
} from "./ResourceType";
var _ = require("lodash");
import mongoose = require("mongoose");
/**
 * Created by vaduc on 7/22/2016.
 */

export const SCHEMA = {
    PRICE_TYPE: {
        fee: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            enum: {
                values: _.toArray(CURRENCY_TYPE),
                default: CURRENCY_TYPE.USD
            }
        }
    },
    CURRENCY_TYPE: {
        type: String,
        enum: {
            values: _.toArray(CURRENCY_TYPE),
            default: CURRENCY_TYPE.USD
        }
    },
    NUMBER_TYPE: {
        type: Number,
        default: 0
    },
    STATUS_TYPE: {
        type: String,
        enum: _.toArray(STATUS),
        default: STATUS.Enabled
    },
    GENDER_TYPE: {
        type: String,
        enum: _.toArray(GENDER)
    },
    PHONE_TYPE: {
        type: String,
        match: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        // code: ERROR_CODE.VALIDATION.COMPANY_NAME_INVALID
    },
    EMAIL_TYPE: {
        type: String,
        trim: true,
        match: /.+\@.+\..+/,
    },
    DATE_DEFAULT_TYPE: {
        type: Date,
        default: Date.now
    },
    CREATED_BY_TYPE: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: 'createdBy cannot be null'
    },
    SETTING_TYPE: {
        type: String,
        enum: _.toArray(SETTING_TYPE)
    },
    SETTING_KEY_TYPE: {
        type: String,
        enum: _.concat(_.toArray(SETTING_KEY.ACCOUNT), _.toArray(SETTING_KEY.USER))
    },
    COMMUNICATION_TYPE: {
        type: String,
        enum: _.toArray(COMMUNICATION_TYPE)
    },
    COMMUNICATION_STATUS: {
        type: String,
        enum: _.toArray(COMMUNICATION_STATUS)
    },
    BOUNCE_TYPE: {
        type: String,
        enum: _.toArray(BOUNCE_TYPE)
    },
    RECIPIENT_ACTION_TYPE: {
        type: String,
        enum: _.toArray(RECIPIENT_ACTION_TYPE)
    },
    BOUNCE_CATEGORY_TYPE: {
        type: String,
        enum: _.toArray(BOUNCE_CATEGORY_TYPE)
    },
    TIMELINE_ACTION_TYPE: {
        type: String,
        enum: _.toArray(TIMELINE_ACTION_TYPE)
    },

    DB_REF: {
        ACCOUNT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'accounts'
        },
        USER: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        CONTACT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'contact'
        },
        TOKEN: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tokens'
        },
        CAMPAIGN: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'campaigns'
        },
        CONTENT: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'content'
        },
        COMMUNICATION: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'communications'
        },
        LINK: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'links'
        },
    },
    NOTIFY_TYPE: {
        type: String,
        enum: _.toArray(NOTIFY_TYPE)
    },
    FIELD_TYPE: {
        type: String,
        enum: _.toArray(CONTACT_FIELD_TYPE)
    },
    TRANSACTION_TYPE: {
        type: String,
        enum: _.toArray(TRANSACTION_TYPE)
    }
};