"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_1 = require("./models/User");
const routes_1 = require("./routes");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config();
let { DB_URL, PORT } = process.env;
DB_URL = DB_URL || "mongodb://localhost:27017/social-network";
PORT = PORT || "8800";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
routes_1.setupRoutes(app);
async function start() {
    console.log("DB_URL:", DB_URL);
    await mongoose_1.connect(DB_URL);
    let user = await User_1.default.findOne({ name: "User222" });
    if (!user) {
        console.log("Default user is not found. Creating the default user ...");
        user = new User_1.default({
            name: "User222",
            email: "user222@mydomain.com",
            avatar: "",
            password: "bla",
        });
        await user.save();
        console.log("Default user is not found. Creating the default user ... Done.");
    }
    else {
        console.log("Existing user found. ", user);
    }
    console.log(user);
    console.log("-------------------------------\nListing users:");
    let users = await User_1.default.find();
    for (let user of users) {
        console.log(user);
    }
}
app.get("/", (req, res) => {
    res.send("Holy shit! It worked!");
});
start()
    .then(() => {
    app.listen(PORT);
    console.log("Listening on port", PORT);
})
    .catch(console.error);
//# sourceMappingURL=main.js.map