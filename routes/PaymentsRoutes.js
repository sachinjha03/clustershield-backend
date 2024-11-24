const express = require('express');
const User  = require('../models/User');
const axios = require('axios');
const {getSubscriptionDetails} = require('../controllers/PaymentController')
const router = express.Router();


router.post('/api/payment/complete', async (req, res) => {
    const { userId, subscriptionID, planId } = req.body;
    if (!userId || !subscriptionID || !planId) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    try {
      const verifyResponse = await getSubscriptionDetails(subscriptionID);
      
      if (verifyResponse.status === 200) {
        
        const subscriptionStatus = verifyResponse.data.status;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        if (subscriptionStatus === 'ACTIVE') {
            user.subscriptionId = subscriptionID;
            user.planId = planId;
            user.subscriptionStatus = subscriptionStatus;
            user.expiresAt = new Date(verifyResponse.data.billing_info.next_billing_time);
            await user.save();
          return res.status(200).send({ message: 'Subscription activated successfully!' });
        } else {

          return res.status(400).send({ message: 'Subscription is not active' });
        }
      } else {
        return res.status(500).send({ message: 'Error verifying subscription' });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;