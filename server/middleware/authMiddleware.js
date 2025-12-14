const express = require("express")
const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../Model/userModel")

const protect = expressAsyncHandler(async  (req , res, next) => {
    let token 
    try {
        
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token , process.env.JWT_secret)

            req.user = await User.findById(decoded.id).select("-password")
            next() 

        }
        else {
            res.status(401)
            throw new Error("Invalid req , token not found")
        }

    } catch (error) {
        res.status(401)
        throw new Error("Invalid req , token not found")
    }
})

module.exports = protect