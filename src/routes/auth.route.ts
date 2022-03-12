import { verifyToken } from './../utils/auth';
import express from "express";
import { LoginHandler, logoutHandler } from "../controller/auth.controller";
const authRouter=express.Router();

//登录
authRouter.post("/login",LoginHandler)
authRouter.post("/logout",verifyToken,logoutHandler)

export default authRouter