import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
type LonginUser = {
  token:string,
  userName:string,
}
export const useLoginUserStore = defineStore('loginUser', () => {

  const loginUser = ref<LonginUser | null>(null)

  const isLogin = () => {
    return loginUser.value
  }
  const setUser = (user:LonginUser) => {
    loginUser.value = user
  }

  return { loginUser,isLogin,setUser }
})
