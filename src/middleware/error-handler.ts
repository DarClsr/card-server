import {NextFunction, Request,Response} from "express";


export const handlerError= (err:any,req:Request,res:Response,next:NextFunction)=>{
    res.status(500).json(err.message)
}
