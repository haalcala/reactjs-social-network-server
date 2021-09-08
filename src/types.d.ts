import { UserType } from "./models/User";
import * as express from "express";

export interface ExpressRequest<Params, ReqBody, ReqQuery> extends express.Request<Params, any, ReqBody, ReqQuery> {
    user: UserType;
    log: () => void;
}

export interface ExpressResponse {
    _error?: string;
    _error_code?: number;
    _status?: string;
}

export type UserUdpatableUserFields = {
    city?: string;
    password?: string;
    relationship?: string;
    country?: string;
    name?: string;
    followers?: string[];
    following?: string[];
};
