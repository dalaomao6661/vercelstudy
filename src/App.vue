
<template>
  <div class="container">
    <div class="mockHeader"></div>
    <div class="header">
      <div class="navigators">
        <div class="btn" @click="router.push('/class')">===</div>
        <div class="btn" @click="router.push('/')">首页</div>
        <div class="btn" @click="router.push('/class')">反诈骗课堂</div>
        <div class="btn" @click="router.push('/question')">诈骗答疑</div>
        <div class="btn" @click="router.push('/disscussion')">防诈骗讨论区</div>
        <div class="btn" @click="router.push('/share')">案例分享</div>
        <div class="btn" v-for="item in 10"></div>
        <div class="btn" @click="router.push('/class')">-----</div>
        <div v-if="!loginUserStore.isLogin()" class="btn" @click="router.push('/login')">登录</div>
        <div v-else class="btn">{{ loginUserStore.loginUser?.userName +'??' }}</div>
        <div class="btn" @click="router.push('/class')">===</div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import router from './router';

import { useLoginUserStore } from '@/stores/loginUser';
const loginUserStore = useLoginUserStore()

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  position: fixed;
  background-color: black;
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.mockHeader {
  height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.navigators {
  width: 1280px;
  height: 40px;
  line-height: 40px;
  display: flex;
  color: white;
  flex-direction: row;
  justify-content: space-around;
}

.btn {
  cursor: pointer;
}</style>
