import { getModelForClass, ModelOptions, prop } from "@typegoose/typegoose";

export type PositionDocument = Position & Document;
@ModelOptions({})
export class Position {
     // 交易账户
    @prop({required:true,type:String})
    public account:string
     // 交易股票代码
    @prop({required:true,type:String})
    public stock:string
     // 交易数量
    @prop({required:true,type:Number})
    quantity:number
     // 交易价格
    @prop({required:true,type:Number})
    price:number
}

const positionModel=getModelForClass(Position)

export default positionModel;