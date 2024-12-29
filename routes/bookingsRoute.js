import express from "express";
import CAR from "../models/carModel.js"
import BOOKING from "../models/bookingModel.js"
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51NFtVGSAZAXtdYSkBaDemNewFODLyLvAZ4Cp8oCxI2m1ecvfG2C1cNpm1B6k6lwIQfD2f9Hxt53gG2hNGExnFVK100raNTKWo4");

const router = express.Router();

router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    // const customer = await stripe.customers.create({
    //   email: token.email,
    //   source: token.id,
    // });

    // const payment = await stripe.charges.create(
    //   {
    //     amount: req.body.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: token.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    // if (payment) {
      req.body.transactionId = token.id; // payment.source.id;
      const newbooking = new BOOKING(req.body);
      await newbooking.save();
      const car = await CAR.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successful");
    // } else {
    //   return res.status(400).json(error);
    // }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await BOOKING.find().populate('car');
    const car=await CAR.findById(bookings[0].car);

    bookings.map((booking)=>{
      booking.car.bookedTimeSlots.map((slot)=>{
        console.log(slot)
      })
    })
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
