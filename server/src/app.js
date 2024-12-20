import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json());
// app.use(urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"
app.use("/users", userRouter);


export default app;