import axios from "axios";
import { useLoginUserStore } from "@/stores/loginUser";
const server = axios.create({
})
server.interceptors.request.use((value) => {
    const loginUserStore = useLoginUserStore()
    const token = loginUserStore.loginUser?.token
    if(token) {
        value.headers.Authorization = 'Bearer ' + token
    }
    return value
})
export const API_PREFIX = '/api/'
export default server