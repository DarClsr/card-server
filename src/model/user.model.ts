import { getModelForClass, ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { Card } from "./card.model";
import { Shop } from "./shop.model";

@ModelOptions({})
export class User {
    @prop({required:true,type:String})
    nick_name:string
    @prop({required:true,type:String})
    account:string
    @prop({required:true,type:String})
    name:string
    // @prop({required:true,type:()=>Card})
    // cards:Ref<Card>[]
    // @prop({required:true,type:()=>Shop})
    // shops:Ref<Shop>[]
}


const userModel=getModelForClass(User)

export default userModel;