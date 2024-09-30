import express from "express"
const router = express.Router();
import CARUSER from "../models/userModel.js"


router.post("/login", async(req, res) => {

      const {username , password} = req.body

      try {
          const user = await CARUSER.findOne({username , password})
          if(user) {
              res.send(user)
          }
          else{
              return res.status(400).json(error);
          }
      } catch (error) {
        return res.status(400).json(error);
      }
  
});

router.post("/register", async(req, res) => {

    

    try {
        const newuser = new CARUSER(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});


export default router

