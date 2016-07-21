/**
 * Created by vaduc on 7/20/2016.
 */
import {RESOURCES} from "../../core/common/ResourceType";

module ERROR_CODE {
    export const AUTH = {
        UNAUTHORIZED: {
            code: 700,
            message: 'unathorized',
            field: '',
            resource: RESOURCES.Account
        },
        NOPERMISSION: {
            code: 701,
            message: 'unathorized',
            field: '',
            resource: RESOURCES.Account
        }
    };

    /**Error code for CONNECT (800->850)*/
    export const DB = {
        /**Connect to DB MongoDB Failed*/
        CONNECT_FAILED: {
            code: 800,
            message: 'Connect to database failed',
            field: '',
            resource: RESOURCES.DB
        }

        // LOG_SERVER_FAILED = 801,
        //
        // CACHE_SERVER_FAILED = 802,
    };

    /**Error code for COMMON (000 -> 99)*/
    export const COMMON = {
        /**Connect to DB MongoDB Failed*/
        FEATURE_DATA_INVALID: {
            code: 10,
            message: 'Feature data invalid',
            field: '',
            resource: RESOURCES.Feature
        },
        FEE_INVALID: {
            code: 11,
            message: 'fee invalid',
            field: '',
            resource: '_'
        },
        CURRENCY_INVALID: {
            code: 12,
            message: 'currency invalid',
            field: '',
            resource: '_'
        }
    };

    export const VALIDATION = {
        KEY_NOT_FOUND: {
            code: 2,
            message: 'Key not found',
            resource: '_'
        },
        FIELD_IS_MISSING: {
            code: 3,
            message: 'field is missing',
            resource: '_'
        },
        FIELD_MUST_BE_GT_THAN: {
            code: 4,
            message: 'field must be gt than',
            resource: '_'
        },
        FIELD_MUST_BE_GT_OR_EQ: {
            code: 5,
            message: 'field must be gt or eq',
            resource: '_'
        },
        FIELD_MUST_BE_LT_THAN: {
            code: 6,
            message: 'field must be lt than',
            resource: '_'
        },
        FIELD_MUST_BE_LT_OR_EQ: {
            code: 7,
            message: 'field must be lt or eq',
            resource: '_'
        },
        FIELD_MUST_BE_IN_RANGE: {
            code: 8,
            message: 'field must be in range',
            resource: '_'
        },
        FIELD_MUST_BE_IN_ENUM: {
            code: 9,
            message: 'field must be enum',
            resource: '_'
        },
        FIELD_MIN_LENGTH_VIOLATED: {
            code: 10,
            message: 'field min length violated',
            resource: '_'
        },
        FIELD_MAX_LENGTH_VIOLATED: {
            code: 11,
            message: 'field max length violated',
            resource: '_'
        },
        FIELD_MUST_BE_EMAIL: {
            code: 12,
            message: 'field must be email',
            resource: '_'
        },
    };
}

export = ERROR_CODE;