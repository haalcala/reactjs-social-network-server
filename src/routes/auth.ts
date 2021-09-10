import { MyUtil } from "../my_utils";
import UserModel from "../../src/models/User";

const bcrypt = require("bcrypt");

const router = require("express").Router();

// AFTER - turns the function to heavily typed codes and consistent error/success reply
router.post(
    "/register",
    [],
    MyUtil.getHttpRequestHandler<any, { username: string; name: string; email: string; password: string }>(
        async (req) => {
            // only needs 'req'
            let { username, name, email, password } = req.body; // detects wrong names here

            const { log } = req;

            log("this is a log");

            let newUser = await UserModel.findOne({ $or: [{ username }, { email }] });

            if (newUser) {
                throw "User already exists"; // Replies 500,{_error:"Success", _error_code:500}
            }

            password = await MyUtil.encrypt(password);

            newUser = new UserModel({ username, name, email, password });

            await newUser.save();

            return { user: newUser }; // detects wrong keys and return types here. Replies 200,{_status:"Success", user:{...}}
        }
    )
);

router.post(
    "/login",
    [],
    MyUtil.getHttpRequestHandler<any, { email: string; password: string }>(async (req, res) => {
        let { email, password } = req.body;

        let user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw "Invalid username/password combination";
        }

        return { user };
    })
);

export default router;
