"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpRequest = void 0;
const handleHttpRequest = async (req, res, handler) => {
    try {
        handler(req, res);
    }
    catch (e) {
        res.status(500).json({ error: typeof (e) === "string" ? e : e.message });
    }
};
exports.handleHttpRequest = handleHttpRequest;
//# sourceMappingURL=my_utils.js.map