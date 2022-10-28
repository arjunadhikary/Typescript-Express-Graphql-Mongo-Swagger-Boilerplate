"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("util/types");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
// 1. Create an interface representing a document in MongoDB.
/**
Name
Gender
Phone
Email
Address
Nationality
Date of birth
Education background
Preferred mode of contact(select one from email, phone, none)
 */
var MODE_OF_CONTACT;
(function (MODE_OF_CONTACT) {
    MODE_OF_CONTACT[MODE_OF_CONTACT["EMAIL"] = 0] = "EMAIL";
    MODE_OF_CONTACT[MODE_OF_CONTACT["PHONE"] = 1] = "PHONE";
    MODE_OF_CONTACT[MODE_OF_CONTACT["NONE"] = 2] = "NONE";
})(MODE_OF_CONTACT || (MODE_OF_CONTACT = {}));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, validate: [isEmail_1.default, 'invalid email'] },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true, validate: [types_1.isDate, 'invalid date'] },
    education: { type: String, required: true },
    modeofcontact: {
        type: String,
        enum: MODE_OF_CONTACT,
    },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
