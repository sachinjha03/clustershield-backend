const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { getSubscriptionDetails } = require('../controllers/PaymentController')
router.put("/edit-user/:id", async (req, res) => {
    const id = req.params.id
    const myUser = await User.findOne({ _id: id })
    if (myUser) {
        const response = await User.findByIdAndUpdate({ _id: id }, req.body,
            {
                new: true
            }
        )
        res.status(200).json({ "success": true, "data": response })
    } else {
        res.status(404).json({ "success": false, "reason": "User Not Exist" })
    }
})
router.get("/subscription/status/:id", async (req, res) => {
    const id = req.params.id
    const myUser = await User.findOne({ _id: id })
    if (myUser) {
        if (!myUser.subscriptionId) {
            return res.status(200).json({ "success": true, "data": { status: "NO_SUBSCRIPTION", expiresAt: null, isActive: false } })
        }
        const response = await getSubscriptionDetails(myUser.subscriptionId)
        myUser.subscriptionStatus = response.data.status
        if (response.data.status === "ACTIVE") {
            myUser.expiresAt = new Date(response.data.billing_info.next_billing_time)
        }
        await myUser.save()

        if (myUser.subscriptionStatus === "ACTIVE" || (myUser.subscriptionStatus === "CANCELLED" && myUser.expiresAt > new Date())) {
            return res.status(200).json({ "success": true, "data": { status: myUser.subscriptionStatus, expiresAt: myUser.expiresAt, isActive: true } })
        }
        else {
            return res.status(200).json({ "success": true, "data": { status: myUser.subscriptionStatus, expiresAt: myUser.expiresAt, isActive: false } })
        }
    } else {
        res.status(404).json({ "success": false, "reason": "User Not Exist" })
    }
})

module.exports = router