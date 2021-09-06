"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const users_1 = require("./users");
const auth_1 = require("./auth");
const setupRoutes = (app) => {
    app.use("/api/users", users_1.default);
    app.use("/api/auth", auth_1.default);
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=index.js.map