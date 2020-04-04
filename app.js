var express = require("express");
var userRouter = require("./routers/user")
var http = require("http");
require('dotenv').config();

require("./db/db")



var app = express();
app.use(express.json()); // Parse Json
app.use(userRouter);


http.createServer(app).listen(3000, (err) => {
    if (!err) {
        console.log("Server running at port 3000");
    }
});



