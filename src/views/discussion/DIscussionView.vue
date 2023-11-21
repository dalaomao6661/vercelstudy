<template>
    <div class="opendiscontainer">
        <div class="disContentItem">
            <div>话题主题：</div>
            <div><input class="itp_type" /></div>
        </div>
        <div class="disContentItem">
            <div class="imgcontent">
                <el-upload :auto-upload="true" v-model:file-list="fileList" :limit="10" :accept="'image/*'" :multiple="true"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview" 
                    action="/api/upload-image-multi"
                    :on-success="uploadSuccess"
                    :on-exceed="handleExceed"
                    >
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full style="width: 700px;" :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </div>
        </div>
        <div class="disContentItem">
            <div class="confirm_btn_dis" @click="upload">提交</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref , toRaw} from 'vue';
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'

import type { UploadFile, UploadInstance, UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadInstance []>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)


const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
const upload = () => {
    console.log('upload');
}
const uploadSuccess = (data:any) => {
    console.log(data);
    
}
const handleExceed = () => {
    alert('erroe')
}
</script>
<style scoped>
.opendiscontainer {
    width: 1437px;
    display: flex;
    flex-direction: column;
    color: rgb(132, 132, 132);
}

.disContentItem {
    width: 1000px;
    background-color: blue;
    padding: 30px;
    border-radius: 10px;
    margin: 10px;
}

.imgpreview {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 500px;
    height: auto;
    justify-content: start;
    margin: 10px;
}
.imgcontent {
    width: 500px;
}
.confirm_btn_dis{
    cursor: pointer;
}
.itp_type {
    width: 700px;
    height: 30px;
    border-radius: 5px;
    font-size: 18px;
}
</style>