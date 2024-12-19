import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then( () => {
    app.get("/",(req, res)=>{
        res.send("chal gya");
    })
    app.listen(process.env.PORT || port, ()=> 
    {
        console.log("listening on Port : " + process.env.PORT || port);
    })
})
.catch(() =>{
    console.log("Error in connecting mongoDB")
})