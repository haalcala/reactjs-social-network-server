"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const my_utils_1 = require("src/my_utils");
const router = require("express").Router();
router.get("/:id", async (req, res) => {
    await my_utils_1.handleHttpRequest(req, res, () => {
        const { user } = req.body;
        const { id } = req.params;
        if (!user) {
            throw "Must login first";
        }
        if (req.user.userId === req.params.id || req.user.isAdmin) {
        }
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map