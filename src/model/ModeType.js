export class ModelType{
    /**@type {int} */
    #id
    /**@type {string} */
    #typeName
    constructor(id, typeName){
        this.#id = id
        this.#typeName = typeName
    }
    getId(){
        return this.#id
    }
    getTypeName(){
        return this.#typeName
    }
    setTypeName(name){
        this.#typeName = name
    }
}