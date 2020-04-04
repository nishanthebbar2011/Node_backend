const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth")

const router = express.Router();


router.post("/create_user", async (req, res) => {
    

    try{
        const user = new User({
            username : req.body.username,
            password : req.body.password
        });
        await user.save();
        res.status(201).send({user});
            
        
    } catch (error){
        res.status(400).send(error);
    };
})



router.get('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        if (!user){
            res.status(401).send("Invalid Login Credentials");
        } else{
            token = await user.generateAuthToken();
            return res.status(200).send({user, token});
        }
        } catch (error){
            res.status(400).send(error);
        } 
     
})

//Get user info
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

//Log user out of current device
router.post('/users/me/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save();
        res.send("Successfully Logged out of current device");
    } catch (error){
        res.status(401).send(error);
    }
})

//Log user out of all devices
router.post('/users/me/logoutall', auth, async (req, res) => {
    try{
        const user = req.user;
        user.tokens.splice(0, user.tokens.length)
        await user.save();
        res.send("Successfully Logged out of all devices");
    } catch(error){
        res.status(500).send(error);
    }
})


//Export userRouter
module.exports = router;



