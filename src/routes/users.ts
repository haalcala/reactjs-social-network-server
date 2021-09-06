import { handleHttpRequest } from "../../src/my_utils";

const router = require("express").Router();


// update user
router.get("/:id", async (req, res) => {
    await handleHttpRequest(req, res, () => {
        const { user } = req
        const { id } = req.params

        if (!user) {
            throw "Must login first"
        }

        if (req.user.userId === req.params.id || req.user.isAdmin) {
            if (req.body.password)
        }
    })

});

// delete user

// get user

// follow user

// unfollow user

export default router;
