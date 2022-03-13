import { verifyToken } from './../utils/auth';
import express from "express";
import { createZip, LoginHandler, logoutHandler, preUpload, verifyDisk, verifyDiskToken } from "../controller/auth.controller";
const authRouter=express.Router();

//登录
authRouter.post("/login",LoginHandler)
authRouter.post("/logout",verifyToken,logoutHandler)
authRouter.get("/netDisk",verifyDisk)
authRouter.get("/diskToken",verifyDiskToken)
authRouter.get("/zip",createZip)
authRouter.get("/prepload",preUpload)

export default authRouter