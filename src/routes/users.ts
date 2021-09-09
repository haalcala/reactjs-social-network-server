import { Router } from "express";
import { UserUdpatableUserFields } from "../types";
import UserModel, { UserType } from "../models/User";
import { MyUtil } from "../my_utils";

const router = Router();

// update user
router.put(
    "/:id",
    [],
    MyUtil.getHttpRequestHandler<{ id: string }, UserUdpatableUserFields & { id: string }>(async (req) => {
        const { log, user } = req;
        const { id } = req.params;

        // log("Hello world")

        // if (!user) {
        //     throw "Must login first";
        // }

        let updates = MyUtil.GetClientUserFields(req.body, true);

        if (req.body.id === req.params.id || user.isAdmin) {
            if (updates.password) {
                updates.password = await MyUtil.encrypt(updates.password);
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
    MyUtil.getHttpRequestHandler<{ id: string }, { id: string; isAdmin: boolean }>(async (req) => {
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
router.get(
    "/:id",
    [],
    MyUtil.getHttpRequestHandler<{ id: string }, { userId: string }, { names: string[] }>(async (req) => {
        if (req.body.userId === req.params.id) {
            const { id } = req.params;

            const user = await UserModel.findById(id);

            if (!user) {
                throw { _error: "User not found", _error_code: 505 };
            }

            return { user: MyUtil.GetClientUserFields(user) };
        }
    })
);

// follow user
router.get(
    "/:id/follow",
    [],
    MyUtil.getHttpRequestHandler<{ id: string }, { id: string }, { names: string[] }>(async (req) => {
        if (req.body.id === req.params.id) {
            const { id } = req.params;

            const user = await UserModel.findById(id);

            if (!user) {
                throw { _error: "User not found", _error_code: 505 };
            }

            return { user };
        }
    })
);

// unfollow user

export default router;
