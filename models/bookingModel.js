import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({


      car : {type : mongoose.Schema.Types.ObjectID , ref:'CAR'},
      user : {type : mongoose.Schema.Types.ObjectID , ref:'CARUSER'},
      bookedTimeSlots : {
          from : {type : String} ,
          to : {type : String}
      } ,
      totalHours : {type : Number},
      totalAmount : {type : Number},
      transactionId : {type : String},
      driverRequired : {type : Boolean}


},
  {timestamps : true}
)

const BOOKING = mongoose.model('BOOKING' , bookingSchema)
export default BOOKING;

