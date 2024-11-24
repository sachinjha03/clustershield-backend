const axios = require('axios');

const getPayPalAccessToken = async () => {
  const creds = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`;
  console.log(creds)
  try {
    const response = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(creds).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Error getting PayPal Access Token:', error);
  }
};

const getSubscriptionDetails = async (subscriptionID)=> {
  return await axios.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionID}`, {
    headers: {
      'Authorization': `Bearer ${await getPayPalAccessToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
}

module.exports = { getPayPalAccessToken,getSubscriptionDetails };
