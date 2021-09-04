import UserModel from "../../src/models/User";

const bcrypt = require("bcrypt");

const router = require("express").Router();

router.post("/register", async (req, res) => {
    let { username, name, email, password } = req.body;

    try {
        let newUser = await UserModel.findOne({ $or: [{ username }, { email }] });

        if (newUser) {
            throw "User already exists";
        }

        const salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        newUser = new UserModel({ username, name, email, password });

        await newUser.save();

        res.json(newUser);
    } catch (e) {
        const err = { error: typeof e === "string" ? e : e.message };
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw "Invalid username/password combination";
        }

        res.json(user);
    } catch (e) {
        const err = { error: typeof e === "string" ? e : e.message };
        res.status(500).json(err);
    }
});

export default router;
