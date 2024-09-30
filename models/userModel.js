import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
     username : {type:String , required: true},
     password : {type:String , required: true}
})

const CARUSER = mongoose.model('CARUSER' , userSchema)
export default CARUSER

