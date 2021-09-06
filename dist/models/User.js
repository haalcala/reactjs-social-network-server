"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, require: true, min: 3, max: 20, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
    profilePicture: { type: String },
    converPicture: { type: String },
    followers: [
        {
            type: String,
        },
    ],
    following: [{ type: String }],
    desc: { type: String, required: true },
    city: { type: String, required: true },
    hometown: { type: String, required: true },
    relationship: { type: String, required: true },
}, { timestamps: true });
exports.UserModel = mongoose_1.model("Users", schema);
exports.default = exports.UserModel;
//# sourceMappingURL=User.js.map