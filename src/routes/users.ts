import { Router } from "express";
import { UserUdpatableUserFields } from "src/types";
import UserModel, { UserType } from "../models/User";
import { MyUtil } from "../my_utils";

const router = Router();

// update user
router.put(
    "/:id",
    [],
    MyUtil.handleHttpRequest<{ id: string }, UserUdpatableUserFields>(async (req, res) => {
        const { log, user } = req;
        const { id } = req.params;

        if (!user) {
            throw "Must login first";
        }

        let updates: UserUdpatableUserFields = {};

        if (user._id === req.params.id || user.isAdmin) {
            if (req.body.password) {
                let password = req.body.password;

                password = await MyUtil.encrypt(password);

                updates.password = password;
            }
        }

        console.log("Trying to update with ", updates);

        if (Object.keys(updates).length > 0) {
            const user = await UserModel.findByIdAndUpdate(id, { $set: updates });

            return "Successfully updated";
        } else {
            return "There's nothing to be updated";
        }
    })
);

// delete user
router.delete(
    "/:id",
    [],
    MyUtil.handleHttpRequest<{ id: string }, { id: string; isAdmin: boolean }>(async (req, res) => {
        const { log } = req;

        if (req.body.id === req.params.id || req.body.isAdmin) {
            const { id } = req.params;

            const user = await UserModel.findByIdAndDelete(id);

            if (!user) {
                let err = { _error: "User not found", _error_code: 505 };

                return err;
            }

            console.log(user);

            return "Successfully deleted";
        } else {
            throw "You can only delete your account";
        }
    })
);

// get user

// follow user

// unfollow user

export default router;
