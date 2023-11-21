<template>
    <div>
        <div>userName<input v-model="userName"></div>
        <div>password<input v-model="password"></div>
        <div><button @click="login">登录</button></div>
    </div>
</template>
<script setup lang="ts" >
import { useLoginUserStore } from '@/stores/loginUser';
import authAPi from '@/api/auth'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const userName = ref('')
const password = ref('')
const loginUser = useLoginUserStore()
const router = useRouter()

const login = () => {
    authAPi.login(userName.value,'root').then(res => {
       const data = res.data
       console.log(data);
       
       if(data.code == '200'){
            loginUser.setUser({
            userName:data.userName,
            token:data.token,
        })
        router.back()
       }
    })
}
</script>