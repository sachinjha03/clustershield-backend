const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sachin03nic:sachin03nic@clustershield.zqdlo.mongodb.net/clustershield?retryWrites=true&w=majority&appName=clustershield").then(() => {
    console.log("Conencting to the database....");
}).catch((err) => {
    console.log("Failed to connect , Reason :- ", err);
})
