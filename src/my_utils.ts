import { request, Response, response } from "express";
import { ExpressRequest, ExpressResponse, UserUdpatableUserFields } from "./types";

import * as bcrypt from "bcrypt";
import { UserType } from "./models/User";
import { USER_UPDATABLE_USER_FIELDS } from "./constants";

export namespace MyUtil {
    export function getHttpRequestHandler<Params = any, ReqBody = any, QueryParams = any>(
        handler: (
            req: ExpressRequest<Params, ReqBody, QueryParams>,
            res: Response
        ) => Promise<void | string | ExpressResponse>
    ): (req: ExpressRequest<Params, ReqBody, QueryParams>, res: Response) => Promise<void> {
        return async (req, res) => {
            try {
                const result = (await handler(req, res)) || "Success";

                if (typeof result === "string") {
                    res.json({ _status: result });
                } else if (result._error || result._error_code > 0) {
                    res.status(result._error_code || 500).json(result);
                } else {
                    result._status = result._status || "Success";

                    res.json(result);
                }
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    _error: typeof e === "string" ? e : e._error || e.message,
                    _error_code: e._error_code || 500,
                });
            }
        };
    }

    export async function encrypt(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        value = await bcrypt.hash(value, salt);

        return value;
    }

    export function GetClientUserFields(
        user: UserUdpatableUserFields | UserType,
        throw_on_violation = false
    ): UserUdpatableUserFields {
        const ret = {};

        for (let field of Object.keys(user)) {
            if (field !== "id") {
                if (USER_UPDATABLE_USER_FIELDS.indexOf(field) == -1) {
                    if (throw_on_violation) {
                        throw `The field ${field} cannot be updated`;
                    }
                } else {
                    ret[field] = user[field];
                }
            }
        }

        return ret;
    }
}
