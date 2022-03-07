import express,{Express} from "express";
import postionRouter from "./position.route";

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("hello world")
})

router.use("/position",postionRouter)

export default router
