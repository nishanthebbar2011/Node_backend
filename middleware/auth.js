const jwt = require("jsonwebtoken");
const User = require("../models/user");


const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);

    try {
        const user = await User.findOne({_id : data._id, 'tokens.token' : token});
        if(! user){
            console.log("Cannot find user");
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch(error){
        res.staus(401).send(({error : "Unable to access the required information."}))
    }
}

module.exports = auth;