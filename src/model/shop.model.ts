import { getModelForClass, ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

@ModelOptions({})
export class Shop {
    @prop({required:true,type:String})
    public name:string
    @prop({required:true,type:String})
    public banner:string
    @prop({required:true,type:()=>User})
    user:Ref<User>
    @prop({required:true,type:String})
    address:string
}

const shopModel=getModelForClass(Shop)

export default shopModel;