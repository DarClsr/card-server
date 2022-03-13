
import {Request,Response} from "express"
import adminService from "../services/admin.service"
import bcrypt from "bcrypt"

 const createHandler=async (req:Request,res:Response)=>{
     const params={
         account:req.body.account,
         password:bcrypt.hashSync(req.body.password,10)
     }
     const user=await adminService.create(params)
      res.send(user)
}

export  {
    createHandler,
}