import userModel from "../model/user.model";
import {CrudService} from "./CRUD"

export class AdminService extends CrudService{
    constructor(){
        super()
        this.model=(userModel as any);
    }
} 

export default new AdminService()