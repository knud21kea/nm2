import dotenv from "dotenv/config";

import express from "express";
const app = express();
app.use(express.json());

import helmet from "helmet";
app.use(helmet());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apiLimiter);

import session from "express-session";
app.use(session({
    //secret: process.env.SESSION_SECRET,
    secret: "abcdefg",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

function restrictedAuthorizer(req, res, next) {
    if (!req.session.name) {
        return res.status(403).send({ message: "This is a restricted area, please log in." });
    }    
    next();
}

app.use("/restricted-area", restrictedAuthorizer);

app.get("*", (req, res) => {
    res.send("<h1>404 - Not Found</h1>")
});


import userRouter from "./routers/userRouter.js";
app.use(userRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, (error) =>{
    if (error){
        console.log(error)
    }
    console.log("Server is running on port:", PORT) 
})