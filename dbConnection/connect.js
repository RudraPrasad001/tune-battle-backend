const mongoose = require("mongoose");
const connectDb= async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
    await mongoose.connection.collections.contacts.drop();
    console.log("Database cleared on server restart.");
        console.log(connect.connection.host+" success "+connect.connection.port);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
    
}
module.exports=connectDb;