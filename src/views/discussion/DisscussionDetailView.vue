<template>
    <div class="disdetailcontainer">
        <div class="disscussionitem">
            返回
        </div>
        <div class="disscussionitem">
            <div class="profile_name_time">
                <div class="profile_disscussion_Item">profie</div>
                <div>
                    <div class="name_disscussion_item">name</div>
                    <div>time</div>
                </div>
            </div>
            <div class="content_disssion_conttent">
                <div class="textarea">thisi is a text</div>
                <!-- TODO if else 判断视频封面还是图片asdasd 封面 fdfds-->
                <div v-if="true" class="picture_area">
                    <div v-for="item in 5" class="pic_item"></div>
                </div>
                <div v-else class="video_area">
                </div>
            </div>
            <div class="comment_like">
                <div class="cl_item">comment{number}</div>
                <div class="cl_item">like!{number}</div>
            </div>
        </div>
        <div class="disscussionitem">
            <div>
                <div>请输入您的评论</div>
                <div><input/></div>
                <div>评论</div>
            </div>
            <hr>
            
        </div>
    </div>
</template>

<style scoped>
.disdetailcontainer {
    width: 1200px;
    background-color: azure;
}

.disscussionitem {
    width: 700px;
    background-color: beige;
    margin: 20px;
    border-radius: 10px;
    padding: 20px;
}

.profile_name_time {
    width: 700px;
    display: flex;
    flex-direction: row;
}

.profile_disscussion_Item {
    height: 60px;
    width: 60px;
    background-color: aqua;
    border-radius: 60px;
    margin-right: 7px;
}

.name_disscussion_item {
    font-size: 23px;
}

.content_disssion_conttent {
    margin-left: 67px;
}

.textarea {}

.picture_area {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    width: 620px;
}

.video_area {
    height: 400px;
    width: 600px;
    background-color: blueviolet;
}

.pic_item {
    height: 150px;
    width: 150px;
    background-color: blue;
    margin: 3px;
}

.comment_like {
    margin-left: 67px;
    display: flex;
    width: 500px;
    flex-direction: row;
}

.cl_item {
    cursor: pointer;
    flex: 1;
    text-align: center;
    background-color: aqua;
    margin: 5px;
}</style>