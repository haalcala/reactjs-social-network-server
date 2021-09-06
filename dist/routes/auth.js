"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../src/models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();
router.post("/register", async (req, res) => {
    let { username, name, email, password } = req.body;
    try {
        let newUser = await User_1.default.findOne({ $or: [{ username }, { email }] });
        if (newUser) {
            throw "User already exists";
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        newUser = new User_1.default({ username, name, email, password });
        await newUser.save();
        res.json(newUser);
    }
    catch (e) {
        const err = { error: typeof e === "string" ? e : e.message };
        res.status(500).json(err);
    }
});
router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await User_1.default.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw "Invalid username/password combination";
        }
        res.json(user);
    }
    catch (e) {
        const err = { error: typeof e === "string" ? e : e.message };
        res.status(500).json(err);
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map