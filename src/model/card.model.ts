import { getModelForClass, ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

@ModelOptions({})
export class Card {
    @prop({required:true,type:String})
    public cardNo:string
    @prop({required:true,type:String})
    public banner:string
    @prop({required:true,type:()=>User})
    user:Ref<User>
    @prop({required:true,type:Number})
    balance:Number
}

const shopModel=getModelForClass(Card)

export default shopModel;