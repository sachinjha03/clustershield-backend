const express = require("express")
require("./db/connection")
const port = 8000
const app = express()
const cors = require('cors')
const cron = require('node-cron');
const updateAllUsers = require('./utils/updateAllUsers');
require('dotenv').config();
app.use(express.json())
app.use(cors())

app.use(require("./routes/CreateUser"))
app.use(require("./routes/LoginUser"))
app.use(require("./routes/EditUser"))
app.use(require("./routes/DeleteUser"))
app.use(require("./routes/PaymentsRoutes"))



app.listen(port , () => {
    console.log("Listening from the backend 8000");
})

cron.schedule('0 0 * * *', async () => {
    try {
        await updateAllUsers();
        console.log('All users updated successfully');
    } catch (error) {
        console.error('Error updating users:', error);
    }
});