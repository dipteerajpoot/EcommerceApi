import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
         type:String,
        required:true,
        unique:true
    },   
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
    },
    profile:{
        imageName:String,
        address:String
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},
{versionKey:false}
);
export const User = mongoose.model("user",UserSchema);   

