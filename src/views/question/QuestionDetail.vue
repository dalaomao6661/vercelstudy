<template>
    <div class="qdcontainer">
        <div class="qbitemcontent">
            <div>{{ question.title }}</div>
        </div>
        <div class="qbitemcontent">
            <div v-html="question.contentHtml">
            </div>
        </div>
        <div class="qbitemcontent">
            <div class="answercontainer" v-for="item,key in answers">
                <div class="answervote">
                    <div @click="vote(1,key)" :style="item.myVote == 1 ? {backgroundColor:'blue'} :{}" class="votebtn">▲</div>
                    <div>{{item.votes}}</div>
                    <div  @click="vote(-1,key)" :style="item.myVote == -1 ? {backgroundColor:'blue'} :{}" class="votebtn">▼</div>
                </div>
                <div class="answercontent" v-html="item.questionAnswer.contentHtml" ></div>
            </div>
        </div>
        <div class="qbitemcontent">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height:300px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="handleCreated" />
            <div class="submitbtn" @click="uploadAnswer">提交</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, onActivated } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useRoute } from 'vue-router'
import questionApi from '@/api/question'
import questionAnswerApi from '@/api/questionAnswer'
const route = useRoute()

const question = ref<any>({})
const answers = ref<any[]>([])
onActivated(() => {
    const id = route.query.id as string
    questionApi.getQuestionAndAnswersById(id).then(res => {
        const data = res.data
        question.value = data.questionAndAnswers.question
        answers.value = data.questionAndAnswers.answerList
    })
})
const vote = (v:number,answerIndex:number) => {

    if(v !== answers.value[answerIndex].myVote) {
        console.log(v);
        console.log(answerIndex);
        //  += v
        answers.value[answerIndex].myVote = v
        questionAnswerApi.vote(v,answers.value[answerIndex].questionAnswer.id,question.value.id).then(res => {
            answers.value[answerIndex].votes =  res.data.totalVotes
            
        })
    }
}
const mode = 'simple';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
})

const toolbarConfig = {
    excludeKeys: [
        "insertVideo",
    ]
}
const editorConfig:any = { placeholder: '请输入内容...',MENU_CONF:{} }
editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload-image',
  fieldName: 'file',
  maxFileSize: 20971520
}
editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode: any | null) { 
        if (imageNode == null) return

        const { src, alt, url, href } = imageNode
        uploadedImage.value.push(src as string)
    }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor:any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    console.log(editor);
}

const uploadedImage = ref<string[]>([])
const finalUploadedImage = ref<string[]>([])
const ignoreUploadedImage = ref<string[]>([])
const uploadAnswer = () => {
  const list:any[] = editorRef.value.getElemsByType('image')
  list.forEach(x => {
    finalUploadedImage.value.push(x.src)
  })
  uploadedImage.value.forEach(x => {
    if(!finalUploadedImage.value.includes(x)) {
      ignoreUploadedImage.value.push(x)
    }
  })
  const needUpload = {
    contentHtml:valueHtml.value,
    ignoreUploadedImage:ignoreUploadedImage.value,
    answerTo:question.value.id
  }
  console.log(needUpload);
  questionAnswerApi.addAnswer(needUpload).then(res => {
    answers.value.push(res.data.answer)
  })
}

</script>
<style scoped>
.qdcontainer {
    width: 1400px;

}

.qbitemcontent {
    width: 900px;
    background-color: rgb(146, 146, 146);
    margin: 10px;
    border-radius: 10px;
    padding: 20px;
    overflow: auto;
}

.submitbtn {
    width: 100px;
    height: 50px;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;
    line-height: 50px;
    background-color: antiquewhite;
    border-radius: 5px;
    cursor: pointer;
}
.answercontainer {
    background-color: antiquewhite;
    margin: 10px;   
    display: flex;
    flex-direction: row;
    border-radius: 5px;
}
.answervote {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.answercontent {
    flex: 3;
}
.votebtn {
    background-color:bisque;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    margin: 5px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
}
</style>