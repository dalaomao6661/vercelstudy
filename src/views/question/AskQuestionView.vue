<template>
  <div class="askcontainer">
    <div class="askleft">
      <div class="askhead"></div>
      <div class="tip"></div>
      <div class="title">
        <div class="titlecontent">
          <div class="titletext">Title</div>
          <div style="line-height: 30px;">Be specific and imagine you’re asking a question to another person.</div>
          <div><input v-model="title" placeholder="请输入标题。。。" style="width: 1000px;height: 30px;border-radius: 5px;" /></div>
        </div>
      </div>
      <div class="title">
        <div class="titlecontent">
          <div class="titletext">Describe</div>
          <div style="line-height: 30px;">Be specific and imagine you’re asking a question to another person.</div>
          <div><input v-model="describe" placeholder="请输入标题。。。" style="width: 1000px;height: 30px;border-radius: 5px;" /></div>
        </div>
      </div>
      <div class="questioncontent">
        <div>
          <div class="titletext" style="margin-top: 30px;" >What are the details of you problem?</div>
          <div style="line-height: 30px;">aaa</div>
          <div style="border: 1px solid #ccc; width: 1000px;margin-bottom: 30px;">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
              :mode="mode" />
            <Editor style="height: 500px;" v-model="valueHtml" :defaultConfig="editorConfig"
              :mode="mode" @onCreated="handleCreated"
              @onInsertedImage="insertImg" />
          </div>
        </div>

      </div>
      <div class="buttons">
        <div class="confirmbtn" @click="uploadQuestion">确认</div>
      </div>
    </div>
    <div class="askright">2</div>
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { type IToolbarConfig, type IEditorConfig } from '@wangeditor/editor'
import questionApi from '@/api/question'


// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> | any = {
  MENU_CONF: {
  },
  placeholder: "请你输入点东西吧。。。"
}
const insertImg = (...arg:any) => {
  console.log(arg);
}

editorConfig.MENU_CONF['uploadImage'] = {
  server: '/api/upload-image',
  fieldName: 'file',
  maxFileSize: 20971520
}
editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode: any | null) {  // TS 语法
    // onInsertedImage(imageNode) {                    // JS 语法
        if (imageNode == null) return

        const { src, alt, url, href } = imageNode
        uploadedImage.value.push(src as string)
    }
}


const toolbarConfig: Partial<IToolbarConfig> = {  // TS 语法
  excludeKeys: [
    "insertVideo",
    "todo",
    "blockquote"
  ]
}

const mode = 'simple';


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  const uploadConfig = editor.getMenuConfig('uploadImage')
  // console.log(uploadConfig);
}

const title = ref('')
const describe = ref('')

const uploadedImage = ref<string[]>([])
const finalUploadedImage = ref<string[]>([])
const ignoreUploadedImage = ref<string[]>([])
const uploadQuestion = () => {
  // console.log(title.value);
  // console.log(valueHtml.value);
  const list:any[] = editorRef.value.getElemsByType('image')
  list.forEach(x => {
    finalUploadedImage.value.push(x.src)
  })
  uploadedImage.value.forEach(x => {
    if(!finalUploadedImage.value.includes(x)) {
      ignoreUploadedImage.value.push(x)
    }
  })
  console.log('e');
  
  questionApi.add({
    title:title.value,
    content:valueHtml.value,
    describe:describe.value,
    ignoreImages:ignoreUploadedImage.value
  })

}

</script>
<style scoped>
.askcontainer {
  width: 1437px;
  display: flex;
  flex-direction: row;
  color: rgb(132, 132, 132)  ;
}

.askleft {
  width: 1060px;
}

.askright {
  flex: 1;
}

.askhead {
  height: 180px;
  width: 1060px;
}

.tip {
  height: 300px;
  background-color: rgb(41, 40, 39);
  margin: 0 auto;
  margin-bottom: 25px;
  border-radius: 10px;
}

.title {
  height: 150px;
  width: 1060px;
  background-color: rgb(41, 40, 39);
  margin: 0 auto;
  margin-bottom: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.titlecontent {
  width: 1000px;
}

.titletext {
  font-size: 25px;
}

.questioncontent {
  width: 1060px;
  background-color: rgb(41, 40, 39);
  margin-bottom: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.buttons {
  width: 1060px;
  background-color: rgb(41, 40, 39);
  border-radius: 10px;
  height: 100px;
  margin-bottom: 105px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.confirmbtn {
  height: 50px;
  width: 120px;
  line-height: 50px;
  font-size: 25px;
  text-align: center;
  background-color: antiquewhite;
  border-radius: 10px;
}</style>