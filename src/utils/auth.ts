import jwt, { JwtPayload } from "jsonwebtoken";
import {Request,Response,NextFunction} from "express"
import { Ipayload } from "../types/jwt.interface";





export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    const token:any = req.headers.authorization?.split(" ").pop();
  
    if (!token) {
      return res.status(401).send({
        msg:"身份验证需要令牌"
      });
    }
    console.log(token)
    try { 
      if(!process.env.TOKEN_KEY) return false;
      const payload:Ipayload =jwt.verify(token, process.env.TOKEN_KEY) as Ipayload;
      console.log(payload)
      req.userId=payload?.id
    } catch (err) {
      return res.status(401).send({
        msg:"令牌错误"
      });
    }
    return next(); 
  };