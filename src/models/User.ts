import { model, Schema } from "mongoose"

const schema = new Schema<User>({
    username:{type:String,require:true,min:3,max:20, unique:true},
    name:{type:String, required:true},
    email:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false},
    password:{type:String, required:true},
    profilePicture:{type:String,},
    converPicture:{type:String,},
    followers:[ {
        type: String,
    }],
    following:[{type:String}]
},{timestamps:true})

export interface User {
    username:string
    name:string
    email:string
    isAdmin:boolean
    password:string
    profilePicture?:string
    converPicture:string
    followers:string[]
    following:string[]
}

export const UserModel=model<User>("Users",schema)

export default UserModel