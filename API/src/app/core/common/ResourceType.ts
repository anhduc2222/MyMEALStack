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