<template>
    <div class="container_">
        <div>
            <el-carousel height="500px" style="background-color: aqua;" :interval="5000" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 text="2xl" style="color: aliceblue;" justify="center">{{ '口号' + item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>最新案例</div>
        <div>aaa</div>
        <div style="height: 100px;width:300px;text-overflow: ellipsis;white-space:normal; word-break:break-all;overflow:hidden;">pickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickervpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickervvvvvvpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickervvpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickerpickervv</div>
        <div class="videocontent">
            <VideoItem v-for="item in 20"></VideoItem>
        </div>
        <div>page</div>
    </div>
</template>
<script setup lang="ts">
import VideoItem from '@/components/class/VideoItem.vue'
</script>
<style scoped>
.container_ {
    width: 1437px;
    color: aliceblue;
}
.videocontent{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>