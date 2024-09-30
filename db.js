import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

function connectDB(){

    mongoose.connect(process.env.MONGO_URL , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successful')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

export default mongoose