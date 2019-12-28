<template>
    <div class="quesItem">
        <div class="questionArea" v-if="!data.isFuHeQuestion">
            <p v-html="questionNameFn(questionItem)" class="questionTitleArea"></p>
            <!--<img src="../../../../static/img/no2.png" alt="" />-->
            <ul>
                <li v-for="">
                    <div class="optionKeyWrap">
                        <span v-html=""></span>
                        <span>、</span>
                    </div>
                    <div class="answerContent">
                        <p v-html=""></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ["questionItem"],
    data() {
        return {
            data: {
                gradeName: "",
                score: "",
                analysis: "",
                isLocalTemp: false,
                isFuHeQuestion: false,
                subtitles: []
            }
        };
    },
    mounted() {
    },
    methods: {
        questionNameFn(questionItem) {
            let questionName = questionItem.questionStem;
            console.log(this.strToUrl(questionName));
            return this.strToUrl(questionName);
        },
        answerFn(answer, questionItem) {
            let answerTemp = answer;
            return this.strToUrl(answer);
        },
        answerDealFn(questionItem) {
            //				console.log(questionItem)
            let answer;

            if (questionItem.hasOwnProperty("quesOption")) {
                answer = questionItem.quesOption;
            } else {
                answer = questionItem.questionOption;
            }

            //				console.log(answer,"答案信息");
            if (answer == "") {
                return [];
            }
            if (answer) {
                return JSON.parse(answer);
            }
        }
    }
};
</script>
<style lang="scss">
.quesItem {
    padding: 35px 10px;
    border-bottom: 1px solid #e1e5ec;
    overflow: hidden;
    .questionArea {
        float: left;
        word-wrap: break-word;
        /*连续的数字或者英文就会不换行 得使用强制换行*/
        word-break: break-all;
        p.questionTitleArea {
            width: 650px;
            word-wrap: break-word;
            word-break: break-all;
            /*display: inline-block;*/
            margin-bottom: 20px;
            img {
                max-width: 50%;
            }
        }
        img {
            vertical-align: middle;
        }
        li {
            vertical-align: top;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
            .optionKeyWrap,
            .answerContent {
                float: left;
                max-width: 650px;
                img {
                    vertical-align: top;
                    max-width: 50%;
                }
            }
        }
        .fuheQuestionName {
            word-wrap: break-word;
            /*连续的数字或者英文就会不换行 得使用强制换行*/
            word-break: break-all;
            max-width: 600px;
        }
    }
   
}
</style>

