<template>
  <div>
    <span @click="agreement()">《易教测评用户服务协议》</span>
    <el-dialog
      :visible.sync="dialogVisible"
      center
      customClass="title1"
      :modal-append-to-body="false"
    >
      <span class="title">
        北京易教空间教育科技股份有限公司
        用户注册使用协议
      </span>
      <p class="text">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议由您与北京易教空间教育科技股份有限公司（以下简称“易教空间”）共同缔结，本协议具有合同效力。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议中协议双方合称协议方，北京易教空间教育科技股份有限公司在本协议中亦称为“易教空间”。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议内容包括协议正文及所有易教空间已经发布的或将来可能发布的各类规则，所有规则为本协议不可分割的组成部分，与本协议正文具有同等法律效力。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本协议中“易教空间服务”包含易教空间自主研发并向用户提供的“易教测评”和“提分行动”两大教育咨询服务。
        <br>您应当在使用易教空间教育咨询服务之前认真阅读全部协议内容（未成年人应当在法定监护人陪同下阅读），如对协议有任何疑问，应向易教空间咨询。但无论您事实上是否在使用易教空间服务协议之前认真阅读了本协议内容，只要使用易教空间教育咨询服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得易教空间对您问询的解答等事由，主张本协议无效，或者要求撤销本协议。
        您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，应立即停止注册程序或停止使用易教空间教育咨询服务。
        易教空间有权根据需要不定时地制订、修改本协议及/或各类规则，并以产品内公示的方式进行公告，不再单独通知。变更后的协议和规则一经在产品内公布后，立即自动生效。如您不同意相关条款变更，应当立即停止使用易教空间教育咨询服务。若您继续使用易教空间服务，则表示您接受经修订的协议。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、使用规则
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、用户充分了解并同意：易教测评/提分行动仅为用户提供信息获取和教育咨询服务的产品，用户必须为自己注册账号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何结果。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、易教空间保留因业务发展需要，单方面对全部或部分服务内容在任何时候、不经任何通知的情况下变更、暂停、限制、终止或撤销易教测评或提分行动的权利，用户需承担此风险。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、易教空间提供的服务中可能包含广告，用户同意在使用过程中显示易教测评和第三方供应商、合作伙伴提供的广告。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、产品中的专家咨询经典视频为易教空间原创，版权完全归易教空间所有，用户不得拷贝他用，不得以任何手段上传至任何网络平台。易教空间保留对此种非法行为进行追求的权利。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5、用户不得利用易教测评/提分行动进行违法国家法律法规、侵犯他人权益的行为。易教空间可依其合理判断，对违反有关法律法规或本协议约定的用户进行处理，并且依据法律法规保存有关信息向有关部门报告。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6、用户权利及义务
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）、易教空间账号的所有权归易教空间所有，用户完成申请注册手续后，获得易教空间账号的使用权，易教空间因经营需要，有权收回用户的易教空间账号。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）、用户有权更改、删除易教易教测评/提分行动上的个人资料、注册信息等，但需注意，删除有关信息的同时也会删除任何您储存在系统中的文字以及订单等信息。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）、用户有责任妥善保管注册账号信息及账号密码的安全，用户需要对注册账号以及密码下的行为承担法律责任。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）、用户注册易教空间账号后如果长期不登录该账号，易教空间有权收回该账号，以免造成资源浪费，由此带来问题均由用户自行承担。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、用户隐私政策
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、用户在注册或使用本服务的过程中，可能需要填写或提交一些必要的信息，如法律法规、规章规范性文件（以下简称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法律的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址、用户聊天记录。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在易教空间服务器端的基本记录信息、个人隐私信息范围之外的其他普通信息，以及用户同意公开的上述隐私信息。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、尊重用户个人隐私信息的私有性是易教空间一贯制度，易教空间将采取技术措施和其他必要措施，确保用户个人隐私信息安全，防止在本服务中收集的用户个人隐私信息泄露、毁损或丢失，在发生前述情形或者易教空间发现存在前述情形的可能时，将采取及时的补救措施。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、易教空间在未经用户同意不向任何第三方公开、透露用户个人隐私信息。但以下情形除外：
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）、易教空间根据法律法规规定或有权机关的指示提供用户的个人隐私信息；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）、由于用户将其用户密码告知他人或与他人共享注册账户与密码，由此导致用户任何个人信息泄漏，或其他非因易教空间原因导致的个人隐私信息的泄漏；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）、用户自行向第三方公开其个人隐私信息；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）、用户与易教空间及合作单位之间就用户个人隐私信息的使用公开达成约定，易教空间因此向合作单位公开用户个人隐私信息；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（5）、任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5、用户同意易教空间可以在以下事项中使用用户的个人隐私信息：
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）、易教空间向用户及时发送重要通知，如软件更新、本协议条款的变更；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）、易教空间内部进行审计、数据分析和研究等，以改进易教空间的产品、服务和与用户之间的沟通；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）、依本协议的约定，易教空间管理、审查用户信息及进行处理措施；
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）、适用法律法规规定的其他事项。
        除上述事项外，如未取得用户事先同意，易教空间不会将用户个人隐私信息使用于任何其他用途。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6、为了改善易教空间的技术和服务，向用户提供更好的服务体验，易教空间将自行收集使用或向第三方提供用户的个人隐私信息。
        易教空间会不时更新本隐私保护声明。我们会在网页上发布对隐私权声明所做的变更内容。当您接受本协议条款时，您同样认可并接受易教空间隐私政策的条款。
        易教空间十分重视未成年人的隐私保护，若您是18周岁以下的未成年人，在使用易教空间的服务前，应事先取得您家长或法定监护人的书面同意。易教空间根据国家相关法律法规的规定保护未成年人的个人隐私信息。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三、易教空间易教测评商标信息
        易教测评平台服务中所涉及的LOGO图形、文字、或其他组成，及产品、服务名称，均为易教空间之商标（以下简称“易教空间标识”）。未经易教空间事先书面同意，用户不得将易教空间在线标识以任何方式展示或使用或用作其他处理，也不得向他人表明您有权展示、使用、或其他有权处理易教空间标识的行为。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 四、法律责任及免责
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1、本《协议》遵循中华人民共和国相关的法律法规，与中华人民共和国法律解释相一致。用户和服务方一致同意服从各级法院管辖。如本《协议》中某些条款与中华人民共和国现行法律相抵触时，这些条款将完全按照现行法律规定重新进行解释，但不影响其它有效条款的有效性和本《协议》的整体效力。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2、用户违反本《协议》或相关服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户同意赔偿易教空间，使之免受损害。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3、用户因第三方如电信部门的通讯线路故障、技术问题、网络、电脑故障、系统不稳定性及其他各种不可抗力原因而遭受的一切损失，易教空间及合作单位不承担责任。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  4、因技术故障等不可抗力时间影响到服务的正常运行的，易教空间承诺在第一时间与相关单位配合，及时处理进行修复，但用户因此而遭受的一切损失，易教空间不承担责任。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5、易教空间定义的信息内容包括：原创视频、文字、相片、图片、图表；易教空间为用户提供的商业信息，所有这些内容受版权和其它知识产权和所有权法律的保护。所以，用户只能在易教空间授权下才能使用这些内容，而不得擅自复制、修改、编纂这些内容、和创造与内容有关的衍生产品。
        五、其他条款
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1、易教空间郑重提醒用户注意本《协议》中免除易教空间责任和加重用户义务的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本《协议》。以上各项条款内容最终解释权及修改权归易教空间所有。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2、本《协议》所定的任何条款的部分或全部无效者，不影响其它条款的效力。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3、本《协议》的解释、效力及纠纷的解决，适用于中华人民共和国法律。若用户和易教空间之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户在此完全同意将纠纷或争议提交易教空间住所地即北京市有管辖权的人民法院管辖。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4、本《协议》的版权归易教空间所有，易教空间保留一切解释和修改的权利。
        <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5、若您对易教空间及本服务有任何意见，欢迎垂询易教空间。
      </p>
      <button class="Btn" @click="dialogVisible = false">关闭</button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    agreement() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scpoed lang='less'>
.text {
  margin-top: 20px;
  line-height: 36px;
  height: 700px;
  // overflow: auto;
  overflow-y: scroll;
}
.title {
  text-align: center;
  display: block;
  margin-top: -30px;
  font-size: 16px;
}
.title1 {
  height: 90%;
  overflow: hidden;
  margin-top: 30px !important;
  width: 60%;
}
.Btn {
  display: block;
  margin: 20px auto;
  text-align: center;
  width: 100px;
  height: 28px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background: #c80032;
}
</style>
