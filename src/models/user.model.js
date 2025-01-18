`use strict`;
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avtar:{
        type:String,// Cloudinary url
        required:true,
    },
    coverImage:{
        type:String,// Cloudinary url
        required:true,
    },
    watchHistory:
    [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type:String,
    required:[true,"Password is required!"],
},
refreshToken:{
    type:String
}
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        this.password = bcrypt.hash(this.password,10);
        next()
    }
})

UserSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAcessToken =  function()
{
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACESS_TOKEN_EXPIRY
    }
)
}
UserSchema.methods.generateRefreshToken =  function()
{
    return jwt.sign(
        {
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model('User',UserSchema);