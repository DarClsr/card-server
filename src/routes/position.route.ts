import express from "express";
import {createHandler} from "../controller/position.controller";
const postionRoute=express.Router();

postionRoute.post("/create",createHandler)

postionRoute.get("/list",(req,res)=>{
    res.send("list")
})
export default postionRoute