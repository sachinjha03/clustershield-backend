const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/clusterShield").then(() => {
    console.log("Conencting to the database....");
}).catch((err) => {
    console.log("Failed to connect , Reason :- ", err);
})