<template>
    <div class="discusscontainer">
        <div style="flex: 2;">???</div>
        <div class="sidebar">
            <div>
                <div class="sidebaritem" @click="$router.push('/opendiscussion')">开启新话题</div>
            </div>
        </div>
        <div class="midarea">
            <div class="opendiscussion">some big imgs</div>
            <div class="dsicontent">
                <DisscussionItem></DisscussionItem>
            </div>
        </div>
        <div style="flex: 3;">
            <div class="rightbar">
                <div v-for="item in 10">{{ item }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import DisscussionItem from '@/components/discussion/DiscussionItem.vue'
</script>
<style scoped>
.discusscontainer {
    width: 1437px;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: row;
}
.sidebar {
    width: 261.27px;
    position: fixed;
    background-color: antiquewhite;
}
.midarea {
    flex: 6;
    /* background-color: aqua; */
}
.rightbar {
    position: fixed;
    width: 391.91px;
    background-color: aquamarine;
}
.opendiscussion {
    height: 300px;
    background-color: aquamarine;
    margin-top: 100px;
}
.dsicontent {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.sidebaritem {
    cursor: pointers;
}

</style>