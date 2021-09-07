import { request, response } from "express";
import { ExpressRequest } from "./types";

import * as bcrypt from "bcrypt";

export namespace MyUtil {
    export async function handleHttpRequest<T>(
        req: any,
        res: any,
        handler: () => Promise<string | { _error?: string; _error_code?: number; _status?: string }>
    ) {
        try {
            const result = await handler();

            if (typeof result === "string") {
                res.json({ _status: result });
            } else if (result._error || result._error_code > 0) {
                res.status(500).json(result);
            } else {
                res.json(result);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ _error: typeof e === "string" ? e : e.message, _error_code: e._error_code || 500 });
        }
    }

    export async function encrypt(value: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        value = await bcrypt.hash(value, salt);

        return value;
    }
}
