const express = require("express");
const Post = require("../models/post")
const auth = require("../middleware/auth");



const router = express.Router();


router.post('/create_post', auth, async (req, res) => {
    try{
        const newPost = new Post({
            author : req.user._id,
            subject : req.body.subject,  
            content : req.body.content,
        });

        await newPost.save();
        res.status(201).send("New Post successfuly created");
    } catch (error){
        res.status(400).send(error);    
    }

})

router.get('/posts/me', auth, async(req, res) => {
    try{
        const posts = await Post.find({"author" : req.user._id});
        console.log(posts);
        res.status(201).send( {posts} );
    } catch(error){
        console.log(error);
    }
})

module.exports = router;