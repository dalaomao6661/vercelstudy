import server from "..";
import { API_PREFIX } from "..";
const prefix = 'auth/'
const authApi = {
    login: (userName:string,password:string) => {
        return server.post(`${API_PREFIX}${prefix}login`,{
            userName,
            password
        })
    }
}

export default authApi