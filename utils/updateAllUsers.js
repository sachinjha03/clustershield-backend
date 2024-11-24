const {getSubscriptionDetails} = require('../controllers/PaymentController')
const User = require("../models/User")

const updateAllUsers = async () => {
    const users = await User.find();
    for (const user of users) {
        if (user.subscriptionId) {
            const response = await getSubscriptionDetails(user.subscriptionId);
            user.subscriptionStatus = response.data.status;
            user.expiresAt = new Date(response.data.billing_info.next_billing_time);
            await user.save();
        }
    }
}
module.exports = updateAllUsers;