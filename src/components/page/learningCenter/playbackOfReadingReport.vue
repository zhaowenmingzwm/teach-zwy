<template>
    <!--解读报告回放-->
    <div class="playback-of-reading-report">
        <div class="replay-header">
            <P>学习中心>{{paperName }}>专家咨询</P>
        </div>
		<div class="content-area">
			<div class="header-information">
				<div class="information-left">
					<p>专家咨询时间：{{liveStartTime}}</p>
					<p>专家咨询试卷：{{paperName}}</p>
					<p>专家咨询老师：{{liveTeacherName}}</p>
				</div>
				<div class="information-right">
					<p>提示：专家咨询视频会在参加咨询的24小时后生成，保留时间为3-6个月，请及时查看</p>
				</div>
			</div>
			<div class="Video-area">
				<div class="Video-img" v-for="(item,index) in img" :key="index" :class='(index + 1) % 4 == 0 ? "right" : ""'>
					<img src="../../../../static/img/bookCollege/img.png" alt="">
					<p>{{paperName}}</p>
					<a  @click="goLive(item.httpsPlaypath)"></a><!--:href="item.httpsPlaypath"-->
					<!-- <a @click='iframeBtn(item.httpsPlaypath)'></a> -->
				</div>
			</div>
					<!-- <iframe :src="qwe" frameborder="0" width="500" height="500"></iframe> -->
		</div>
    </div>
</template>

<script>
export default {
	data(){
		return {
			paperName:this.$route.query.paperName,
			liveTeacherName:this.$route.query.liveTeacherName,
			img :[
			],
			qwe:''
		}
	},
	computed:{
		liveStartTime(){
			return this.formatDate(this.$route.query.liveStartTime)
		}
	},
	methods:{
		getList(){
			this.$axios.get(this.lantianUrl + `/live/findRecordList?roomId=${this.$route.query.roomId}`).then(res =>{
				this.img = res.result
			})
		},
    goLive(val){
      var url="https://testingtest.e-eduspace.com";
      if(location.hostname == 'testing.e-eduspace.com'){
        url="https://testing.e-eduspace.com";
      }
     // this.localData.set('liveUrl',val)
      var tw=window.open('_blank');
      tw.location=url+'#/goLive?liveUrl='+val;
      //window.open()
			//this.qwe = item
		}
	},
	created(){
		console.log(this.formatDate(1555297013000))
		this.getList()
	}
}
</script>

<style lang='less' scoped>
.playback-of-reading-report{
	margin: 0 auto;
	.replay-header{
		height: 52px;
		line-height: 52px;
		border-bottom: 1px solid #d9d9d9;
		background: #fff;
		p{
			width: 1200px;
			margin: 0 auto;
			color: #7f7f7f;
		}
	}
	.content-area{
		width: 1200px;
		margin: 0 auto;
		.header-information{
			height: 130px;
			background-color: #fff;
			margin-top: 20px;
			border: 1px solid #e6e6e6;
			.information-left{
				float: left;
				p{
					margin-top: 18px;
					padding-left: 35px;
					color: #7f7f7f;
					font-size: 14px;
				}
			}
			.information-right{
				float: right;
				margin-right: 24px;
				width: 401px;
				height: 80px;
				border: 1px solid #e6e6e6;
				margin-top: 24px;
				p{
					margin-top: 15px;
					font-size: 14px;
					margin-left: 17px;
					margin-right: 17px;
					line-height: 24px;
					color: #7f7f7f;
				}
			}
		}
		.Video-area{
      height:auto;
      overflow: hidden;
      padding-top:22px;
			.Video-img{
				width: 284px;
				height: 295px;
				float: left;
				margin-right: 21px;
				margin-bottom: 22px;
				background: #fff;
				position: relative;
				img{
					width: 100%;
					height: 182px;
				}
				a{
					width: 47px;
					height: 47px;
					display: block;
					position: absolute;
					left: 120px;
					top: 68px;
					background: url(../../../../static/img/bookCollege/play.png);
				}
				p{
					margin-top: 20px;
					line-height: 28px;
					font-size: 16px;
					color: #666666;
					margin-left: 26px;
					margin-right: 26px;
				}
			}
			.right{
				margin-right: 0px;
			}
		}
	}
}
</style>
