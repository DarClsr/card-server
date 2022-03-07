import { getModelForClass, getModelWithString, ReturnModelType, } from "@typegoose/typegoose"
import { ModelType } from "@typegoose/typegoose/lib/types"
import {Model,Document} from "mongoose"


export class CrudService {
    modelType:any
    model:ModelType<DocumentType>
    async create<T>(body:T):Promise<any>{
        console.log(body)
        return  this.model.create(body)
    }
}