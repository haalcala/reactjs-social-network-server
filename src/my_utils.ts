import { request, response } from "express"


export const handleHttpRequest = async (req: any, res: any, handler: any) => {
    try {
        handler(req, res)
    }
    catch (e) {
        res.status(500).json({ error: typeof (e) === "string" ? e : e.message })
    }
}