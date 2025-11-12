
import { Admin } from "../model/Admin";

const url1 = "http://localhost:5000/admin/checkLogin"

export default class AdminController {
    constructor(){}
    async checkLogin(admin){
        try{
            const res = await fetch(url1,{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    username: admin.getUsername(),
                    password: admin.getPassword(),
                })
            })
            const data= await res.json();
            if(data.status === "success"){
                return new Admin(data.user[0],data.user[1],data.user[2],data.user[3],data.user[4])
            } else return null;
        } catch (e){
            
        }
    }
}