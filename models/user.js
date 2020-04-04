const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tokens : [
        {
         token:{
             type: String,
             required : true
         }   
        }
    ]
    
})

//Hash password before saving to database.
userSchema.pre('save', function (next){
    
    if (this.isModified("password")){
        this.password = bcrypt.hashSync(this.password);
    }
    next();

})

//Generate a JWT token for authentication
userSchema.methods.generateAuthToken = async function() {

    const token = jwt.sign({_id : this._id}, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;

} 


userSchema.statics.findByCredentials = async (username, password)=>{
    
    const user = await User.findOne({"username" : username});
    if (!user){
        throw new Error("Invalid Username Credential");
    }
    const isPasswordsMatch = bcrypt.compareSync(password, user.password);
    if ( ! isPasswordsMatch){
        throw new Error("Invalid password");
    }

    return user;
    
}

//Create UserModel
const User = mongoose.model("User", userSchema);
//Export Usermodel
module.exports = User;







