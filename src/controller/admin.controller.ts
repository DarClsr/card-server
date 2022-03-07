
import {Request,Response} from "express"
import adminService from "../services/admin.service"

 const createHandler=async (req:Request,res:Response)=>{
     const posDoc=await adminService.create(req.body)
      res.send(posDoc)
}

export  {
    createHandler,
}