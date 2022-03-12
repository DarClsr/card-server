import { getModelForClass, ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { Card } from "./card.model";
import { Shop } from "./shop.model";

@ModelOptions({})
export class User {
    @prop({type:String})
    nick_name?:string
    @prop({required:true,type:String})
    account:string
    @prop({required:true,type:String})
    password:string
}


const userModel=getModelForClass(User)

export default userModel;