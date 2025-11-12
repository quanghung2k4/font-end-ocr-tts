import {ModelType}  from "../model/ModeType";
const url1 = "http://localhost:5000/modeltype/getTypeModel"

export default class ModelTypeController{
    constructor(){

    }
    async getAllType(){
        const res = await fetch(url1)
        const data =await res.json()
        return data.modelType.map(item => new ModelType(item.id,item.typeName))
    }
    
}