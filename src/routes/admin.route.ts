import express from "express";
import { createHandler } from "../controller/admin.controller";
const adminRouter=express.Router();

// 增加
adminRouter.post("/create",createHandler)


// 查询
adminRouter.get("/admin_list",(req,res)=>{
    res.send("list")
})

// 更新
adminRouter.put("/:id",createHandler)

// 删除
adminRouter.delete("/:id",(req,res)=>{
    res.send("list")
})
export default adminRouter