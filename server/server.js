const express = require("express")
const cors = require('cors')
const colors = require("colors")
const connect_db = require("./config/db_config")
const errorHandler = require("./middleware/errorHandler")
require("dotenv").config()

 const app = express()
 const port = process.env.port || 5000
 
//  db connection
 connect_db()

 app.get("/",(req,res) =>{
    res.json ({mssg :  "hello server"})
 })
//  add middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// cros origin 
app.use(cors())

app.use(errorHandler)

// auth 
app.use("/api/auth", require("./Routes/authRoutes"));

// plan
app.use("/api/plans", require("./Routes/planRoutes"));

// subscription
app.use("/api/subscribe", require("./Routes/subscriptionRoutes"));

 app.listen(port,() =>{
    console.log(`server is running at ${port}`.bgYellow)
 })