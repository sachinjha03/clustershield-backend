const express = require('express')
const router = express.Router()
const User = require("../models/User")

router.delete("/delete-user/:id" , async(req,res) => {
    try{

        const id = req.params.id
        const myUser = await User.findOne({_id:id})
        if(myUser){
            const response = await User.findByIdAndDelete({_id:id})
            res.status(200).json({"success":true , "data" : response})
        }
        else{
            res.status(404).json({"success":false , "reason" : "USER NOT FOUND!!"})
        }
    }catch(err){
        res.send(500).json({"success":false,"reason":err})
    }
})

module.exports = router