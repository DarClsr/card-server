import { getModelForClass, ModelOptions, prop, Ref } from "@typegoose/typegoose";
export class User {
    @prop({required:true,type:String,description:"账号"})
    account:string
    @prop({required:true,type:String,description:"密码"})
    password:string
    @prop({required:true,type:String,description:"权限等级"})
    role:string
}


const userModel=getModelForClass(User)

export default userModel;