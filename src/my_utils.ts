import { request, Response, response } from "express";
import { ExpressRequest, ExpressResponse } from "./types";

import * as bcrypt from "bcrypt";

export namespace MyUtil {
    export function getHttpRequestHandler<Params = any, ReqBody = any, QueryParams = any>(
        handler: (req: ExpressRequest<Params, ReqBody, QueryParams>, res: Response) => Promise<void | string | ExpressResponse>
    ): (req: ExpressRequest<Params, ReqBody, QueryParams>, res: Response) => Promise<void> {
        return async (req, res) => {
            try {
                const result = (await handler(req, res)) || "Success"

                if (typeof result === "string") {
                    res.json({ _status: result });
                } else if (result._error || result._error_code > 0) {
                    res.status(500).json(result);
                } else {
                    result._status = result._status || "Success"

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
}
