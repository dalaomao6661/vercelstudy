
<template>
    <div class="container">
        <div class="mocksidebar">mock</div>
        <div class="sidebar">
            <div v-for="item in 6">{{ item }}</div>
        </div>
        <div class="questioncontent">
            <div class="top">
                <div class="topleft">All Questions</div>
                <div class="topright"  @click="$router.push('/askquestion')">
                    Ask Question
                </div>
            </div>
            <div class="questionlist">
                <div v-for="item in items" class="question">
                    <div class="questionleft">
                        <div class="questionleftitem">{{item.views}} views</div>
                        <div class="questionleftitem">{{item.answers}} answers</div>
                    </div>
                    <div class="questionright">
                        <div class="title" @click="getDetail(item.question.id)">{{item.question.title}}</div>
                        <div class="content">
                            <p class="text">{{ item.question.describe }}</p>
                        </div>
                        <div class="author">{{ item.author}}</div>
                    </div>
                </div>  
                <div class="page">
                    <el-pagination background layout="prev, pager, next" v-model:current-page="current"
                       :total="total"
                      @current-change="pageChange" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" >
import questionApi from '@/api/question';
import { ref,onActivated } from 'vue';
import {useRouter} from 'vue-router'
const router = useRouter()
const items = ref<any>()
const total = ref<number>(0)
const current = ref<number>()
onActivated(() => {
        questionApi.page(1).then(res => {
            const data = res.data.pages 
            items.value = data.items
            total.value = data.total
            current.value = data.current
            console.log(total.value);
        })
})
const pageChange = (currentPage:number) => {
    questionApi.page(currentPage).then(res => {
            const data = res.data.pages 
            items.value = data.items
            total.value = data.total
            current.value = data.current
            console.log(total.value);
        })
}
const getDetail = (id:string) => {
    console.log(id);
    // questiondetail
    router.push({path:'/questiondetail',query:{id}})
}
</script>
<style scoped>
.container {
    width: 1437px;
    display: flex;
    flex-direction: row;
} 
.sidebar{
    top: 75px;
    position: fixed;
    width: 300px;
    color: aliceblue;
    background-color: rgb(30, 30, 29);
}
.mocksidebar{
    width: 300px;
}
.questioncontent{
    flex: 1;
    background-color: rgb(41, 40, 39);
    color: aliceblue;
    padding: 20px;
}
.top{
    height: 109px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.topleft{
    font-size: 35px;
}
.topright{
    height: 50px;
    width: 150px;
    background-color: rgb(34, 45, 58);
    border-radius: 10px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.topright:hover{
    background-color: rgb(52, 69, 90);
}
.question{
    height: 200px;
    border-top: 1px solid #CCC;
    display: flex;
    flex-direction: row;
}
.questionleft{
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
}
.questionright{
    flex: 8;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.questionleftitem{
    margin: 10px;
}
.title{
    font-size: 25px;
    cursor: pointer;
    color: rgb(115, 115, 214);
}
.content{
    width: 800px;
    height: 60px;
    overflow: hidden;
}
.text{
    white-space: nowrap; /* 禁止文本换行 */
  overflow: hidden; /* 超出容器的部分隐藏 */
  text-overflow: ellipsis; /* 超出容器的部分显示省略号 */
}
.author{
    margin-left: auto;
}
</style>