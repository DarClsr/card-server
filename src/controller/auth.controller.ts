import { User } from './../model/user.model';

import {request, Request,Response} from "express"
import userModel from "../model/admin.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import 'dotenv/config' ;

 const LoginHandler=async (req:Request,res:Response)=>{
     const {body}=req;
     const user:any=await userModel.findOne({account:body.account})
     if(!user) {
        return res.status(422).send({   // 状态码： 422
            msg: '用户名不存在'
        })
    }
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.status(422).send({   // 状态码： 422
            msg: '密码有误'
        })
    }

     const token = process.env.TOKEN_KEY&&jwt.sign({
        id: String(user._id)
    },process.env.TOKEN_KEY)    // 参数2：应该写在环境变量里面，不应该放在代码库中

     res.send({
        user,
        token
     })
   
}

const logoutHandler=async (req:Request,res:Response)=>{
    res.sendStatus(200)
}

export  {
    LoginHandler,
    logoutHandler
}