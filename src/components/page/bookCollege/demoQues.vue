<template>
  <div class="demoQues">
    <question-info :q="questionObj[4]" :a="indexNum" :b="indexNum1" :c="indexNum2" @changeques="changeQues" papertype="2"></question-info>
  </div>
</template>
<script>
  import questionInfo from "./questionInfo.vue";
export default {
    data() {
        return {
          questionObj:[{
            "smallId":"0e503646e41411e8a60800163e0c65b2","smallScore":10.0,"smallSort":1,"bigId":"d002002ee41311e8a60800163e0c65b2","subjectCode":"3","questionCode":"0002304c3b5a4046971b37c31cbb9773","questionType":"1","createName":"小名","createDate":"2016-01-03T19:37:05.000+0000","updateName":"小名","updateDate":"2018-11-09T11:39:02.000+0000","title":"GYB06157","stem":"The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.The&nbsp;newly-built&nbsp;theatre&nbsp;is&nbsp;____&nbsp;the&nbsp;old&nbsp;one.","stemPicture":"402881ce558fb38801558fe890de003c","quesOption":"[{\"optionKey\":\"A\",\"optionValue\":\"&nbsp;as&nbsp;twice&nbsp;big&nbsp;as&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"},{\"optionKey\":\"B\",\"optionValue\":\"&nbsp;twice&nbsp;more&nbsp;bigger&nbsp;than\"},{\"optionKey\":\"C\",\"optionValue\":\"twice&nbsp;the&nbsp;size&nbsp;of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"},{\"optionKey\":\"D\",\"optionValue\":\"twice&nbsp;so&nbsp;big&nbsp;as\"}]","optionPicture":"402881ce558fb38801558feb2dad0042","quesAnalyze":"[{\"analyzeKey\":\"A\",\"analyzeValue\":\"结合选项及题干，可知本题考查倍数表达法，根据选项可知，需要用“倍数+as+形容词、副词原级+as+比较对象”的表达方法，或可以用“倍数+the+名词性质的词+of...”结构，故本题C选项正确。\"}]","anayzePicture":"402881ce558fb38801558fee25ff004a","answer":"C","answerItems":null,"difficultStar":2,"quesComment":null,"remark":null,"videoPath":null,"audioListenPath":null,"source":"web","iscompleted":"4","type":"1","stageCode":"3","subjectFlag":null,"subjectName":"英语","gradeCode":"33","ischecked":"0","checkName":null,"checkTime":null,"gradeRules":"8a2a7468559088eb015594d68b3900aa","score":1.0,"costTime":"1","estimateTime":"1","makeName":null,"makeTime":null,"useTimes":2000,"application":"普通试题","audioAnalyzePath":"http://mp3.resource.e-eduspace.com/GYB06157.mp3","productions":"“倍数+as…as…”结构@“倍数+the+名词性质的词+of...”结构@“倍数+形容词/副词比较级+than...”结构","productionCode":"0351000100010001@0351000100010002@0351000100010003","enlargeId":"402881b951dd91520151dd9e4cbc0007","knowledges":"倍数的表达法","fitCode":"1","productId":"","productType":"1","difficultyCode":null,"graph":null,"ability":null,"productionCodes":null,"baseKnowledgeModels":null,"componentQuestionModels":[]
          },{
            "smallId":"3faeef51e70d11e882dc00163e0c65b2","smallScore":10.0,"smallSort":2,"bigId":"0e4cf36ce41411e8a60800163e0c65b2","subjectCode":"3","questionCode":"8a2a746857d153190157d188d8d403f4","questionType":"2","createName":null,"createDate":"2016-10-17T07:26:29.000+0000","updateName":null,"updateDate":"2018-11-13T06:27:52.000+0000","title":"GYA007","stem":"1.下列哪些选项能判定该题型为推理判断题（ &nbsp;）&nbsp;","stemPicture":"402881ce558fb38801558fe81e510039","quesOption":"[{\"optionKey\":\"A\",\"optionValue\":\"infer&nbsp;\"},{\"optionKey\":\"B\",\"optionValue\":\"indicate&nbsp;\"},{\"optionKey\":\"C\",\"optionValue\":\" main idea &nbsp;\"},{\"optionKey\":\"D\",\"optionValue\":\" imply&nbsp; \"},{\"optionKey\":\"E\",\"optionValue\":\"best title&nbsp;\"},{\"optionKey\":\"F\",\"optionValue\":\"conclude\\n\"}]","optionPicture":"402881ce558fb38801558feb2dad0042","quesAnalyze":"[{\"analyzeKey\":\"\",\"analyzeValue\":\"&nbsp;&nbsp;&nbsp;&nbsp;高考试卷的阅读理解题每年都有推理判断题，题量虽不多，但却是高考题中的常客。主要考查对短文句意、事由、趋势或结论的推理。\\n&nbsp;&nbsp;&nbsp;&nbsp;这类题要求考生根据短文某句、某段或全文所提供的事实和线索进行逻辑推理，推断出作者没提到的或者没明说的事实或者可能发生的事实，旨在考查考生透过词面意义去理解作者的言外之意或弦外之音的能力。\\n&nbsp;&nbsp;&nbsp;&nbsp;这类题的题干常含infer(推断)，suggest(暗示)，imply(暗示)，indicate(预示)，conclude(得出结论)，be\\nlikely to等词语。\\n\"}]","anayzePicture":"402881ce558fb38801558fed29550045","answer":"ABDF","answerItems":null,"difficultStar":1,"quesComment":null,"remark":null,"videoPath":null,"audioListenPath":null,"source":"web","iscompleted":"3","type":"2","stageCode":"3","subjectFlag":null,"subjectName":"英语","gradeCode":"33","ischecked":null,"checkName":null,"checkTime":null,"gradeRules":"402881ce558fb38801558fe9fcc1003e","score":2.0,"costTime":"2","estimateTime":null,"makeName":null,"makeTime":null,"useTimes":2000,"application":"普通试题","audioAnalyzePath":null,"productions":"文章细节的推理判断","productionCode":"0370000100070001","enlargeId":"402881b951dd91520151dd9ea5880009","knowledges":"深度推测题","fitCode":"1","productId":"","productType":"1","difficultyCode":null,"graph":null,"ability":null,"productionCodes":null,"baseKnowledgeModels":null,"componentQuestionModels":[]
          }, {
            "smallId": "8eef2b41e70d11e882dc00163e0c65b2",
            "smallScore": 10.0,
            "smallSort": 1,
            "bigId": "34ad041ee65c11e8a60800163e0c65b2",
            "subjectCode": "3",
            "questionCode": "8a2a74685982d9020159baedab141cd8",
            "questionType": "4",
            "createName": null,
            "createDate": "2017-01-20T08:10:55.000+0000",
            "updateName": null,
            "updateDate": "2018-11-13T06:30:05.000+0000",
            "title": "CYA12367",
            "stem": " 默写（5分）\n&nbsp; &nbsp; 很多诗词歌赋，都表达出了诗人对国家命运的担忧，对个人情感的关切。诗人把自己所看所想都融入到自己的诗中，饱含了许多情思。“马上相逢无纸笔，<span style=\"text-decoration: underline;\">&nbsp; &nbsp;<span style=\"text-decoration: underline; white-space: pre;\">\t</span></span>” （《逢入京使》写出了远在边塞的人对故乡深切的思念之情；“&nbsp;<span style=\"text-decoration: underline;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>，<span style=\"text-decoration: underline;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span> ”（《泊秦淮》）借陈后主荒淫享乐终至亡国的历史，讽刺当时醉生梦死的晚唐统治者，表达自己对国家前途的担忧；还有“<span style=\"text-decoration-line: underline;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>，<span style=\"text-decoration-line: underline;\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>”（《贾生》）写出了对统治者不能真正重视人才的痛惜。",
            "stemPicture": "402881ce558fb38801558fe86cc3003b",
            "quesOption": "",
            "optionPicture": "402881ce558fb38801558feb2dad0042",
            "quesAnalyze": "[{\"analyzeKey\":\"\",\"analyzeValue\":\"根据前半句中“This kind of thing only happens in films这种事只会发生在电影里”可知，现实是不存在的。故填real。\\n\"}]",
            "anayzePicture": "402881ce558fb38801558fedf9d90049,8a2a7468559088eb015594ec479200d3,8a2a7468559088eb015594ecaaa000d6",
            "answer": "[{\"answerValue\":\"凭君传语报平安\",\"score\":\"1\",\"production\":[]},{\"answerValue\":\"商女不知亡国恨\",\"score\":\"1\",\"production\":[]},{\"answerValue\":\"隔江犹唱后庭花。\",\"score\":\"1\",\"production\":[]},{\"answerValue\":\"可怜夜半虚前席\",\"score\":\"1\",\"production\":[]},{\"answerValue\":\"不问苍生问鬼神\",\"score\":\"1\",\"production\":[]}]",
            "answerItems": null,
            "difficultStar": 1,
            "quesComment": null,
            "remark": null,
            "videoPath": null,
            "audioListenPath": null,
            "source": "web",
            "iscompleted": "3",
            "type": "4",
            "stageCode": "2",
            "subjectFlag": null,
            "subjectName": "英语",
            "gradeCode": "24",
            "ischecked": null,
            "checkName": null,
            "checkTime": null,
            "gradeRules": "402881ce558fb38801558fea25f9003f",
            "score": 1.0,
            "costTime": "1",
            "estimateTime": null,
            "makeName": null,
            "makeTime": null,
            "useTimes": 2013,
            "application": "中考真题",
            "audioAnalyzePath": null,
            "productions": "real",
            "productionCode": "0329000100010187",
            "enlargeId": "8a2a7468562bd9e0015630424a9a0174",
            "knowledges": "品质形容词",
            "fitCode": "1",
            "productId": "",
            "productType": "1",
            "difficultyCode": null,
            "graph": null,
            "ability": null,
            "productionCodes": null,
            "baseKnowledgeModels": null,
            "componentQuestionModels": [],
          },{"id":"8a2a7468584422180158486e5bbc1c28","title":"XCA06056","stem":"判断下面词语的书写是否正确。\nfēng qī xuě yā\n&nbsp; &nbsp;(风 欺 雪 压）\n","stemPicture":"402881ce558fb38801558fe81e510039","quesOption":"","optionPicture":"402881ce558fb38801558feb2dad0042","quesAnalyze":"[{\"analyzeKey\":\"\",\"analyzeValue\":\"fēng qī xuě yā写作为风欺雪压，常用作被人、事或者环境欺压。 遭受风的摧残，雪的压迫。形容遭受的困难多，处境坎坷。所以本题正确。\\n&nbsp;&nbsp;\"}]","anayzePicture":"402881ce558fb38801558fecba180044,402881ce558fb38801558fed29550045,402881ce558fb38801558fed611a0046","answer":"1","answerItems":null,"difficultStar":1,"quesComment":null,"remark":null,"videoPath":null,"audioListenPath":null,"source":"web","iscompleted":"4","type":"3","isdel":"0","stageCode":"1","subjectFlag":null,"subjectName":"语文","gradeCode":"15","ischecked":null,"checkName":null,"checkTime":null,"gradeRules":"402881ce558fb38801558fe9fcc1003e","score":2.0,"costTime":"2","estimateTime":null,"makeName":null,"makeTime":null,"useTimes":2000,"createDate":1478683941000,"createBy":"","createName":"脱艳红","updateDate":1485079722000,"updateBy":null,"updateName":"齐明月","application":"普通试题","audioAnalyzePath":"http://mp3.resource.e-eduspace.com/XCA06056.mp3","productions":"风欺雪压","productionCode":"01800009000600030003","enlargeId":"402881b45194ffbc0151951092700010","knowledges":"五、六年级的四字普通词语或成语","fitCode":"1","isClone":null,"groupId":1,"openness":1,"checkStatus":2,"productId":"","productType":"1","organizeStrs":null,"sceneStrs":null,"groupName":"易教空间","papersName":[],"paperNames":null,"causeResults":null,"cp":1,"pageSize":5,"productionCodes":["01800009000600030003"],"baseProductionModels":null,"componentQuestionModels":null}
          ,{
              "smallId":"8ef8caaae70d11e882dc00163e0c65b2","smallScore":10.0,"smallSort":2,"bigId":"38dea48de70d11e882dc00163e0c65b2","subjectCode":"3","questionCode":"2056b7cf4168414c86a84ba3ad3e0f5c","questionType":"5","createName":null,"createDate":"2015-06-01T21:09:41.000+0000","updateName":null,"updateDate":"2018-11-13T06:30:05.000+0000","title":"CYA05433","stem":"根据题意完成句子。\n____the&nbsp;boys_____(visit)&nbsp;the&nbsp;history&nbsp;museum&nbsp;now?","stemPicture":"402881ce558fb38801558fe86cc3003b","quesOption":"","optionPicture":"402881ce558fb38801558feb2dad0042","quesAnalyze":"[{\"analyzeKey\":\"\",\"analyzeValue\":\"根据题中now可以判断，本题考查的是现在进行时。提示词只给出了一个动词visit，而却有两个空需要填，因此可以判断此句应为现在进行时的一般疑问句。其结构为：be动词+主语+doing。因为主语为the&nbsp;boys，所以两个空内分别应填入：Are；visiting。句意为：男孩们现在在参观历史博物馆吗？\"}]","anayzePicture":"402881ce558fb38801558fecba180044,402881ce558fb38801558fed29550045,402881ce558fb38801558fed611a0046","answer":"Are；visiting","answerItems":null,"difficultStar":2,"quesComment":null,"remark":null,"videoPath":null,"audioListenPath":null,"source":"web","iscompleted":"3","type":"5","stageCode":"2","subjectFlag":null,"subjectName":"英语","gradeCode":"21,22,23","ischecked":"0","checkName":null,"checkTime":null,"gradeRules":"402881ce558fb38801558fe9fcc1003e","score":1.0,"costTime":"1","estimateTime":null,"makeName":null,"makeTime":null,"useTimes":2000,"application":"普通试题","audioAnalyzePath":null,"productions":"动词加ing变现在分词@现在进行时的一般疑问句结构@现在进行时表示说话时正在发生或进行着的动作","productionCode":"03380001000500040001@03400001000300010003@03400001000300020001","enlargeId":"402881c553403dbd015340862a660002","knowledges":"动词现在分词的变化规律@现在进行时的构成@现在进行时的用法","fitCode":"1","productId":"","productType":"1","difficultyCode":null,"graph":null,"ability":null,"productionCodes":null,"baseKnowledgeModels":null,"componentQuestionModels":[]
            }],
          questionObj1:{
            "smallId":"3faeef51e70d11e882dc00163e0c65b2","smallScore":10.0,"smallSort":2,"bigId":"0e4cf36ce41411e8a60800163e0c65b2","subjectCode":"3","questionCode":"8a2a746857d153190157d188d8d403f4","questionType":"2","createName":null,"createDate":"2016-10-17T07:26:29.000+0000","updateName":null,"updateDate":"2018-11-13T06:27:52.000+0000","title":"GYA007","stem":"1.下列哪些选项能判定该题型为推理判断题（ &nbsp;）&nbsp;","stemPicture":"402881ce558fb38801558fe81e510039","quesOption":"[{\"optionKey\":\"A\",\"optionValue\":\"infer&nbsp;\"},{\"optionKey\":\"B\",\"optionValue\":\"indicate&nbsp;\"},{\"optionKey\":\"C\",\"optionValue\":\" main idea &nbsp;\"},{\"optionKey\":\"D\",\"optionValue\":\" imply&nbsp; \"},{\"optionKey\":\"E\",\"optionValue\":\"best title&nbsp;\"},{\"optionKey\":\"F\",\"optionValue\":\"conclude\\n\"}]","optionPicture":"402881ce558fb38801558feb2dad0042","quesAnalyze":"[{\"analyzeKey\":\"\",\"analyzeValue\":\"&nbsp;&nbsp;&nbsp;&nbsp;高考试卷的阅读理解题每年都有推理判断题，题量虽不多，但却是高考题中的常客。主要考查对短文句意、事由、趋势或结论的推理。\\n&nbsp;&nbsp;&nbsp;&nbsp;这类题要求考生根据短文某句、某段或全文所提供的事实和线索进行逻辑推理，推断出作者没提到的或者没明说的事实或者可能发生的事实，旨在考查考生透过词面意义去理解作者的言外之意或弦外之音的能力。\\n&nbsp;&nbsp;&nbsp;&nbsp;这类题的题干常含infer(推断)，suggest(暗示)，imply(暗示)，indicate(预示)，conclude(得出结论)，be\\nlikely to等词语。\\n\"}]","anayzePicture":"402881ce558fb38801558fed29550045","answer":"ABDF","answerItems":null,"difficultStar":1,"quesComment":null,"remark":null,"videoPath":null,"audioListenPath":null,"source":"web","iscompleted":"3","type":"2","stageCode":"3","subjectFlag":null,"subjectName":"英语","gradeCode":"33","ischecked":null,"checkName":null,"checkTime":null,"gradeRules":"402881ce558fb38801558fe9fcc1003e","score":2.0,"costTime":"2","estimateTime":null,"makeName":null,"makeTime":null,"useTimes":2000,"application":"普通试题","audioAnalyzePath":null,"productions":"文章细节的推理判断","productionCode":"0370000100070001","enlargeId":"402881b951dd91520151dd9ea5880009","knowledges":"深度推测题","fitCode":"1","productId":"","productType":"1","difficultyCode":null,"graph":null,"ability":null,"productionCodes":null,"baseKnowledgeModels":null,"componentQuestionModels":[],
          },
          indexNum: "1",
          indexNum1:"2",
          indexNum2:"3",
        };
    },
    created() {

    },
    methods: {
      changeQues: function (a,b) {
       console.log(a,b)
      }
    },

    components: {
      questionInfo
    },
    watch: {

    }
};
</script>
<style lang="less">
  @blue-ss: #36a4c8;
  @blue-s: #3ebce5;
  @blue-q: #e7f9ff;
  @blue-y: #ff9234;
  .demoQues{
    width:1120px;
    min-height:420px;
    background-color:#FFF;
    margin:26px auto;
    padding:40px;
  }
</style>

