const mongoose= require('mongoose');

const connectDB= async()=>{
    try{
        mongoose.set('strictQuery',false);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`databse connected succefuly ${conn.connection.host}`);
    }catch(error){
        console.log(error);
    }
}

module.exports=connectDB;