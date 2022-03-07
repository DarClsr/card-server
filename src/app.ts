import express from "express";
import 'dotenv/config' ;
import router from "./routes";
import { connectDb } from "./utils/db";
import morgan from "morgan"
import cors from "cors";
import {handlerError} from "./middleware/error-handler"
connectDb();
const server=express();

server.use(morgan("dev"))
server.use(express.json()); 
server.use(cors)

server.use("/admin/api",router)


server.use(handlerError)



server.listen(process.env.PORT||3000,()=>{
    console.log("server starting "+process.env.PORT)
})
