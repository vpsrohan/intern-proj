import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: ""
    },
    previousCompanies :{
        type: [String],
        default: []
    }
})   

userSchema.statics.signup = async function (email, password, username, profilePicture, rating, bio, previousCompanies){
    console.log(email, password, username, rating, bio, previousCompanies);
    if(!email || !password){
        throw Error("All fields must be filled....")
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Weak Password")
    }
    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, username, profilePicture, rating, bio, previousCompanies})
    return user
}
 
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("Invalid email")
    }
    const checker = await bcrypt.compare(password, user.password)
    if(!checker){
        throw Error("Incorrect password")
    }
    return user
}

const Users = mongoose.model("Users", userSchema)

export default Users

