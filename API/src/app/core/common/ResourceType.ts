/**
 * Created by vaduc on 7/20/2016.
 */
/// <reference path="../../../../typings/index.d.ts" />
var _ = require("lodash");
import mongoose = require("mongoose");

export const RESOURCES = {
    Account: 'account',
    Contact: 'contact',
    Package: 'package',
    Pack: 'pack',
    User: 'user',
    Feature: 'feature',
    Lookup: 'lookup',
    Segment: 'segment',
    Role: 'role',
    DB: 'DB',
    Setting: 'setting',
    DataTypes: 'dataTypes',
    Field: "field",
    Usage: "usage",
    File: 'file'
};

export const DB_FIELD_TYPE = {
    String: "string",
    Textblock: "textblock",
    Email: "email",
    Mobile: "mobile",
    Number: "number",
    Date: "date",
    Time: "time",
    Datetime: "datetime",
    Single: "single",
    Multi: "multi",
    Boolean: "boolean",
    DOB: 'dob'
};

//region Type
export const GENDER = {
    Male: 'male',
    Female: 'female'
};

export const CURRENCY_TYPE = {
    AUD: 'AUD',
    USD: 'USD',
    GBP: 'GBP'
};

export const STATUS = {
    Enabled: 'enabled',
    Disabled: 'disabled'
};

export const SOURCE_IMPORT_TYPE = {
    Manual: 'manual',
    Form: 'form',
    Upload: 'upload'
};

export const NOTIFY_TYPE = {
    Email: 'email',
    Sms: 'sms',
    PushNotification: 'push-notification'
};

export const SETTING_TYPE = {
    Account: 'account',
    User: 'user'
};

export const SETTING_KEY = {
    ACCOUNT: {
        CompanyName: 'companyName',
        LogoUrl: 'logoUrl',
        Domain: 'domain',
        ContactSupportNumber: 'contactSupportNumber',
        HelpPageUrl: 'helpPageUrl',
        BackgroundColor: 'backgroundColor',
        ButtonColor: 'buttonColor',
        BreadcrumbColor: 'breadcrumbColor',
        MenuBarColor: 'menuBarColor',
        HeaderColor: 'headerColor',
        FooterColor: 'footerColor',
        FooterContent: 'footerContent',
        SupportNumber: 'supportNumber',
        SupportEmail: 'supportEmail'
    },
    USER: {
        Language: 'language'
    }
};

export const COMMUNICATION_TYPE = {
    Email: 'email',
    Sms: 'sms'
};

export const COMMUNICATION_STATUS = {
    Draft: 'draft',
    Pending: 'pending',
    Scheduled: 'scheduled',
    Sending: 'sending',
    Sent: 'sent',
    Paused: 'paused',
    Deleted: 'deleted',
};

export const BOUNCE_TYPE = {
    permanent: 'permanent',
    temporary: 'temporary'
};

export const TIMELINE_ACTION_TYPE = {
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED',
    REQUESTED: 'REQUESTED',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    SCHEDULED: 'SCHEDULED',
    CANCELLED: 'CANCELLED',
    SENT: 'SENT',
    PAUSED: 'PAUSED',
    RESUMED: 'RESUMED',
};

export const RECIPIENT_ACTION_TYPE = {
    EMAIL_RELATED_TYPE: {
        EMAIL_SENT: 'EMAIL_SENT',
        EMAIL_OPENED: 'EMAIL_OPENED',
        EMAIL_BOUNCED: 'EMAIL_BOUNCED',
        EMAIL_OPTOUT: 'EMAIL_OPTOUT',
        EMAIL_AUTO_OPTOUT: 'EMAIL_AUTO_OPTOUT',
        EMAIL_BLOCKED: 'EMAIL_BLOCKED',
        EMAIL_SPAM: 'EMAIL_SPAM',
        EMAIL_FAILED: 'EMAIL_FAILED',
        EMAIL_DELETED: 'EMAIL_DELETED'
    },
    SMS_RELATED_TYPE: {
        SMS_SENT: 'SMS_SENT',
        SMS_BOUNCED: 'SMS_BOUNCED',
        SMS_OPTOUT: 'SMS_OPTOUT',
        SMS_AUTO_OPTOUT: 'SMS_AUTO_OPTOUT',
        SMS_BLOCKED: 'SMS_BLOCKED',
        SMS_FAILED: 'SMS_FAILED',
        SMS_DELETED: 'SMS_DELETED'
    }
};

export const BOUNCE_CATEGORY_TYPE = {
    EMAIL_RELATED_TYPE: {
        EMAIL_BAD_CONFIGURATION: 'EMAIL_BAD_CONFIGURATION',
        EMAIL_BAD_CONNECTION: 'EMAIL_BAD_CONNECTION',
        EMAIL_BAD_DOMAIN: 'EMAIL_BAD_DOMAIN',
        EMAIL_BAD_MAILBOX: 'EMAIL_BAD_MAILBOX',
        EMAIL_CONTENT_RELATED: 'EMAIL_CONTENT_RELATED',
        EMAIL_INACTIVE_MAILBOX: 'EMAIL_INACTIVE_MAILBOX',
        EMAIL_INVALID_SENDER: 'EMAIL_INVALID_SENDER',
        EMAIL_MESSAGE_EXPIRED: 'EMAIL_MESSAGE_EXPIRED',
        EMAIL_NO_ANSWER_FROM_HOST: 'EMAIL_NO_ANSWER_FROM_HOST',
        EMAIL_OTHER: 'EMAIL_OTHER',
        EMAIL_POLICY_RELATED: 'EMAIL_POLICY_RELATED',
        EMAIL_PROTOCOL_ERRORS: 'EMAIL_PROTOCOL_ERRORS',
        EMAIL_QUOTA_ISSUES: 'EMAIL_QUOTA_ISSUES',
        EMAIL_RELAYING_ISSUES: 'EMAIL_RELAYING_ISSUES',
        EMAIL_ROUTING_ERRORS: 'EMAIL_ROUTING_ERRORS',
        EMAIL_SPAM_RELATED: 'EMAIL_SPAM_RELATED',
        EMAIL_VIRUS_RELATED: 'EMAIL_VIRUS_RELATED',
    },
    SMS_RELATED_TYPE: {
        SMS_PROVIDER_ERROR: 'SMS_PROVIDER_ERROR',
        SMS_EXPIRED: 'SMS_EXPIRED',
        SMS_LOGIN_ERROR: 'SMS_LOGIN_ERROR',
        SMS_DUPLICATE_MESSAGE: 'SMS_DUPLICATE_MESSAGE',
        SMS_NO_RECIPIENT: 'SMS_NO_RECIPIENT',
        SMS_UPSTREAM_ERROR: 'SMS_UPSTREAM_ERROR',
        SMS_BLACKLISTED: 'SMS_BLACKLISTED',
        SMS_NO_CONTENT: 'SMS_NO_CONTENT',
        SMS_INVALID_CHARS: 'SMS_INVALID_CHARS',
        SMS_INVALID_ORIGIN: 'SMS_INVALID_ORIGIN',
        SMS_CARRIER_ERROR: 'SMS_CARRIER_ERROR',
        SMS_DELAYED: 'SMS_DELAYED',
        SMS_OTHER: 'SMS_OTHER',
    }
};

export const CONTACT_FIELD_TYPE = {
    String: "string",
    Textblock: "textblock",
    Email: "email",
    Mobile: "mobile",
    Number: "number",
    Date: "date",
    Time: "time",
    Datetime: "datetime",
    Single: "single",
    Multi: "multi",
    Boolean: "boolean",
    DOB: 'dob'
};

export const TRANSACTION_TYPE = {
    Email: 'email',
    Sms: 'sms'
};
//endregion Type

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
    SOURCE_IMPORT_TYPE: {
        sourceType: {
            type: String,
            enum: _.toArray(SOURCE_IMPORT_TYPE)
        },
        link: String
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