/// <reference types="mongoose" />
export interface User {
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
}
export declare const UserModel: import("mongoose").Model<User, {}, {}>;
export default UserModel;
