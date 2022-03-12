import express from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import postionRouter from "./position.route";

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("hello world")
})

router.use("/position",postionRouter)
router.use("/admin",adminRouter) 
router.use("/auth",authRouter) 

export default router
