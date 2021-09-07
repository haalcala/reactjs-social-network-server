import { model, Schema } from "mongoose";

const schema = new Schema<UserType>(
    {
        userId: { type: String, require: true, min: 3, max: 20, unique: true },
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
    },
    { timestamps: true }
);

export type UserType = {
    userId: string;
    username: string;
    name: string;
    email: string;
    isAdmin: boolean;
    password: string;
    profilePicture?: string;
    converPicture: string;
    followers: string[];
    following: string[];
    desc: string;
    city: string;
    hometown: string;
    relationship: string;
};

export const UserModel = model<UserType>("Users", schema);

export default UserModel;
