import positionModel, { Position } from "../model/position.model"
import {CrudService} from "./CRUD"

export class AdminService extends CrudService{
    constructor(){
        super()
        this.model=(positionModel as any);
    }
} 

export default new AdminService()