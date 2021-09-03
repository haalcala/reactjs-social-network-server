import { connect } from 'mongoose';
import UserModel from './models/User';

const dotenv=require("dotenv")
const express=require("express")
const helmet=require("helmet")
const morgan=require("morgan")

import userRoute from "./routes/users"

dotenv.config()

let {DB_URL, PORT}=process.env

DB_URL = DB_URL || "mongodb://localhost:27017/social-network"
PORT = PORT || "8800"

const app = express()

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)


async function start() {
    console.log("DB_URL:",DB_URL)

    await connect(DB_URL)

    let user = await UserModel.findOne({name:"User222"})

    if (!user) {
        console.log("Default user is not found. Creating the default user ...")
        user = new UserModel({
            name:"User222",
            email:"user222@mydomain.com",
            avatar:"",
            password:"bla"
        })

        await user.save()
        console.log("Default user is not found. Creating the default user ... Done.")
    }
    else {
        console.log("Existing user found. ",user)
    }

    console.log(user)

    console.log("-------------------------------\nListing users:")

    let users = await UserModel.find()

    for (let user of users) {
        console.log(user)
    }
}

app.get("/",(req,res)=> {
    res.send("Holy shit! It worked!")
})

start()
.then(()=>{
    app.listen(PORT)

    console.log("Listening on port",PORT)
})
.catch(console.error)