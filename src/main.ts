import { connect } from "mongoose";
import UserRouter from "./App";
import UserModel from "./models/User";
import { setupRoutes } from "./routes";

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

setupRoutes(app);

async function start() {
    // console.log("DB_URL:", DB_URL);
    // await connect(DB_URL);
    // console.log("-------------------------------\nListing users:");
    // let users = await UserModel.find();
    // for (let user of users) {
    //     console.log(user);
    // }
    // let user = await UserModel.findOne({ name: "User222" });
    // if (!user) {
    //     console.log("Default user is not found. Creating the default user ...");
    //     user = new UserModel({
    //         name: "User222",
    //         email: "user222@mydomain.com",
    //         avatar: "",
    //         password: "bla"
    //     });
    //     await user.save();
    //     console.log("Default user is not found. Creating the default user ... Done.");
    // } else {
    //     console.log("Existing user found. ", user);
    // }
    // console.log(user);

    console.log("Creating app");
    const app = new UserRouter();
    await app.getUser();
    console.log("app:", app);
    // @ts-ignore
    console.log("app.set_from_MyRoute:", app.set_from_MyRoute);

    console.log("Creating app2");
    const app2 = new UserRouter();
    await app2.getUser();
    console.log("app2:", app2);
    // @ts-ignore
    console.log("app2.set_from_MyRoute:", app2.set_from_MyRoute);
    // @ts-ignore
    console.log("app2.route:", app2.route);
}

app.get("/", (req, res) => {
    res.send("Holy shit! It worked!");
});

start()
    .catch(console.error)
    .then(() => {
        app.listen(PORT);

        console.log("Listening on port", PORT);
    });
