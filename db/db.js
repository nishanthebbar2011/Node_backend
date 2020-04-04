var mongoose = require("mongoose")


//Connect to the MongoDB database.
mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, 
    useCreateIndex : true, 
    useUnifiedTopology : true
 });