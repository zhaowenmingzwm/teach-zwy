<template>
    <div>
        <header class="header">
            <p>专家解读集锦</p>
        </header>

        <div class="Video-area">
            <div class="Video-img" v-for="(item,index) in img" :key="index" :class='(index + 1) % 4 == 0 ? "right" : ""'>
                <video  ref='file' :poster='item.img'    filename="【视频1】深度学习能力专家全解读1.mp4" :controls="item.show"   preload="none" width="284" height="182" :src="item.url" data-setup="{}">
                    <source :src="item.url" type="video/mp4">
                </video>
                <p>{{item.text}}</p>
                <a @click='playBtn(index)' v-show="!item.show"></a>     
                <span>时长：{{item.time}}</span>
            </div>
		</div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            img :[
                {
                  time:'01:08',
                    show:false,
                    text:'为什么叫提分行动？',
                    img:require('../../../../static/img/bookCollege/1.png'),
                    url:'http://officialnetwork.e-eduspace.com/1%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8F%AB%E6%8F%90%E5%88%86%E8%A1%8C%E5%8A%A8.mp4'
                },{
                    time:'01:19',
                    show:false,
                    text:'提分行动的特性？',
                    img:require('../../../../static/img/bookCollege/2.png'),
                    url:'http://officialnetwork.e-eduspace.com/2%E6%8F%90%E5%88%86%E8%A1%8C%E5%8A%A8%E7%9A%84%E7%89%B9%E6%80%A7.mp4'
                },{
                    time:'00:56',
                    show:false,
                    text:'提分行动适合什么学生参加？',
                    img:require('../../../../static/img/bookCollege/3.png'),
                    url:"http://officialnetwork.e-eduspace.com/3%E6%8F%90%E5%88%86%E8%A1%8C%E5%8A%A8%E9%80%82%E5%90%88%E4%BB%80%E4%B9%88%E5%AD%A6%E7%94%9F%E5%8F%82%E5%8A%A0.mp4"
                },{
                    time:'02:33',
                    show:false,
                    text:'分数由什么决定？',
                    img:require('../../../../static/img/bookCollege/4.png'),
                    url:'http://officialnetwork.e-eduspace.com/4%E5%88%86%E6%95%B0%E7%94%B1%E4%BB%80%E4%B9%88%E5%86%B3%E5%AE%9A.mp4'
                },{
                    time:'02:00',
                    show:false,
                    text:'提分行动如何体现专家思维？',
                    img:require('../../../../static/img/bookCollege/5.png'),
                    url:'http://officialnetwork.e-eduspace.com/5%E6%8F%90%E5%88%86%E8%A1%8C%E5%8A%A8%E5%A6%82%E4%BD%95%E4%BD%93%E7%8E%B0%E4%B8%93%E5%AE%B6%E6%80%9D%E7%BB%B4.mp4'
                },{
                    time:'03:10',
                    show:false,
                    text:'学生上了很多培训班成绩却提升不了？',
                    img:require('../../../../static/img/bookCollege/6.png'),
                    url:'http://officialnetwork.e-eduspace.com/6%E5%AD%A6%E7%94%9F%E4%B8%8A%E4%BA%86%E5%BE%88%E5%A4%9A%E5%9F%B9%E8%AE%AD%E7%8F%AD%E6%88%90%E7%BB%A9%E5%8D%B4%E6%8F%90%E5%8D%87%E4%B8%8D%E4%BA%86%EF%BC%9F.mp4'
                },{
                    time:'05:57',
                    show:false,
                    text:'提分行动如何高效提分？',
                    img:require('../../../../static/img/bookCollege/7.png'),
                    url:'http://officialnetwork.e-eduspace.com/7%E6%8F%90%E5%88%86%E8%A1%8C%E5%8A%A8%E5%A6%82%E4%BD%95%E9%AB%98%E6%95%88%E6%8F%90%E5%88%86.mp4'
                },{
                    time:'03:36',
                    show:false,
                    text:'易教测评如何保障准确性？',
                    img:require('../../../../static/img/bookCollege/8.png'),
                    url:'http://officialnetwork.e-eduspace.com/8%E6%98%93%E6%95%99%E6%B5%8B%E8%AF%84%E5%A6%82%E4%BD%95%E4%BF%9D%E9%9A%9C%E5%87%86%E7%A1%AE%E6%80%A7.mp4'
              },{
                    time:'01:05',
                    show:false,
                    text:'易教测评的使用情况？',
                    img:require('../../../../static/img/bookCollege/9.png'),
                    url:'http://officialnetwork.e-eduspace.com/9%E6%98%93%E6%95%99%E6%B5%8B%E8%AF%84%E7%9A%84%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5%EF%BC%9F.mp4'
              },{
                    time:'01:21',
                    show:false,
                    text:'易教测评获得了哪些认证？',
                    img:require('../../../../static/img/bookCollege/10.png'),
                    url:'http://officialnetwork.e-eduspace.com/10%E6%98%93%E6%95%99%E6%B5%8B%E8%AF%84%E8%8E%B7%E5%BE%97%E4%BA%86%E5%93%AA%E4%BA%9B%E8%AE%A4%E8%AF%81.mp4\n'
              }
            ]
        }
    },
    methods:{
        playBtn(index){
            for(let i=0;i<this.img.length;i++){
                this.$refs.file[i].pause()
                this.img[i].show = false;
            }
            this.img[index].show = true;
            this.$refs.file[index].play()
        }
    }
}
</script>

<style scoped lang='less'>
.header{
    height: 62px;
    width: 1200px;
    margin: 0 auto;
    border-bottom: 1px solid #d9d9d9;
    p{
        font-size:16px;
        padding-top: 28px;
        color: #333333;
    }
}
.Video-area{
    overflow: hidden;
    width: 1200px;
    margin: 0 auto 20px;
    position: relative;
    .Video-img{
        width: 284px;
        height: 295px;
        float: left;
        margin-right: 21px;
        margin-top: 22px;
        background: #fff;
        position: relative;
        img{
            width: 100%;
            height: 182px;
        }
        p{
            margin-top: 10px;
            margin-left: 26px;
            font-size: 16px;
            color: #666666;
            line-height: 28px;
            margin-right: 20px;
        }
        a{
            position: absolute;
            display: block;
            left: 118px;
            top: 59px;
            width: 50px;
            height: 50px;
            background: url(../../../../static/img/bookCollege/play.png) no-repeat;
            cursor: pointer;
        }
        span{
            position: absolute;
            right: 20px;
            bottom: 20px;
            color: #999999;
            font-size: 14px;
        }
    }
    .right{
        margin-right: 0px;
    }
}
</style>
