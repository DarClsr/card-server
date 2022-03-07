
import {Request,Response} from "express"
import positionService from "../services/position.service"

 const createHandler=async (req:Request,res:Response)=>{
     const posDoc=await positionService.create(req.body)
      res.send(posDoc)
}

export  {
    createHandler,
}