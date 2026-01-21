import express from "express"
const app= express();
import { nanoid } from "nanoid"; 
import dotenv from "dotenv"
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/short_url.model.js";
import short_url from "./src/routes/short_url.route.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/ErrorHandler.js";
import cors from "cors"


app.use(cors())
dotenv.config("./.env")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/create",short_url)
app.use("/api/auth",auth_routes)
app.get("/:id", redirectFromShortUrl)
app.use(errorHandler)
app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on port on http://localhost:3000")
})

//get - Redirection 
//post - create short url 