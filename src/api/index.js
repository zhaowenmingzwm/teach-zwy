import {
  Message
} from 'element-ui'
import axios from 'axios';
// 超时时间
axios.defaults.timeout = 20000;
axios.defaults.params = {
  requestId: Math.random()
}
// http请求拦截器
axios.interceptors.request.use(config => {
  let user = localData.get('userInfo');
  console.log(config);
  if (user && user.token) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = user.token;
    config.headers.openId = user.openId;
  }
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(response => {
  // 响应成功
  switch (response.data.httpCode) {
    case '500':
      Message.error({
        message: response.data.message
      })
      break
    case "20002":
      Message.error({
        message: '用户或密码不正确'
      })
      break
    case "40001":
      Message.error({
        message: '未知请求'
      })
      break
    case "40002":
      Message.error({
        message: '参数丢失'
      })
      break
    case "40003":
      Message.error({
        message: '参数类型错误'
      })
      break
    case "40004":
      Message.error({
        message: '状态错误'
      })
      break
    case "40005":
      Message.error({
        message: '资源不存在'
      })
      break
    case "40006":
      Message.error({
        message: '资源被使用'
      })
      break
    case "40007":
      Message.error({
        message: '资源重复'
      })
      break
    case "40008":
      Message.error({
        message: '请求达到上限'
      })
      break
    case "40010":
      Message.error({
        message: '该年级尚有班级没有相关学科的任课老师,请完善信息.'
      })
      break
    case "40301":
      Message.error({
        message: '认证失败'
      })
      break
    case "40302":
      Message.error({
        message: '无操作权限'
      })
      break
    case "40304":
      Message.error({
        message: '签名错误'
      })
      break
    case "40305":
      Message.error({
        message: '资源锁定'
      })
      break
    case "40101":
      Message.error({
        message: '用户重复登录'
      })
      break
    case "600002":
      Message.error({
        message: '账号异地登录,请重新登录'
      });
      window.location.href = 'index.html'
      break
    case "600003":
      Message.error({
        message: 'token过期,请重新登录'
      });
      window.location.href = 'index.html'
      break
  }
  return response.data;
}, error => {
  if (!error.response) {
    Message.error({
      message: error.message
    })
  }

  return Promise.reject(error) // 返回接口返回的错误信息
})

export var $regexp = ({
  isMobile: value => /^1[34578]\d{9}$/.test(value),
  isCode: value => /^\d{6}$/.test(value)
})

export var dataParse = (value) => {
  let time = new Date(parseInt(value));

  function minTen(num) {
    return num > 9 ? num : '0' + num;
  }

  return time.getFullYear() + "-" + minTen(time.getMonth() + 1) + "-" + minTen(time.getDate()) + " " + minTen(time.getHours()) + ":" + minTen(time.getMinutes());
}

export var localData = {
  get(name) {
    if (!name) return null;
    return JSON.parse(localStorage.getItem(name));
  },
  set(name, obj) {
    if (!name) return;
    localStorage.setItem(name, JSON.stringify(obj));
  },
  delete(name) {
    localStorage.removeItem(name);
  }
};
//解析试题结束
export let $$user = () => localData.get('userInfo') || {};
let teacherId = () => $$user().userId;
let filterSend = (send) => {
  return Object.assign(send, {
    userId: teacherId()
  })
}
/*图片*/


//前后空格去除
export let Trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//会话缓存
export var sessionData = {
  get(name) {
    if (!name) return null;
    return JSON.parse(sessionStorage.getItem(name));
  },
  set(name, obj) {
    if (!name) return;
    sessionStorage.setItem(name, JSON.stringify(obj));
  },
  delete(name) {
    sessionStorage.removeItem(name);
  }
};

//当前时间
function num(s) {
  return s < 10 ? '0' + s: s;
}
export var currentTime = (a) => {//几天后的日期
  a = a? a:0;
  var d = new Date();
  d.setDate(d.getDate()+a);//获取AddDayCount天后的日期
  var ye = d.getFullYear();
  var mo = d.getMonth()+1;
  var da = d.getDate();
  return ye+'-'+num(mo)+'-'+num(da);
}
function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth()+1;//获取当前月份的日期
  var d = dd.getDate();
  return y+"-"+m+"-"+d;
}
//根据时间戳转换时间
export var  formatDate =(res) => {
  var now = new Date(Number(res))
  var year=now.getFullYear();
  var month=now.getMonth()+1;
  var date=now.getDate();
  return year+"-"+month+"-"+date;
}


export var  formatDates =(res) => {
  console.log(res)
  var now = new Date(Number(res))
  var year=now.getFullYear();
  var month=(now.getMonth()+1) ;
  var date=now.getDate();
  var time = now.getHours() >= 10 ?  now.getHours() : '0' +  now.getHours();
  var minute = now.getMinutes() >= 10 ? now.getMinutes() : '0' + now.getMinutes();
  var second = now.getSeconds() >= 10 ? now.getSeconds() : '0' + now.getSeconds();
  return year+"-"+month+"-"+date + ' ' + time + ':' + minute + ':' + second;
}

/*图片*/
export var strToUrl = (str) => {
  if (!str || typeof str != "string") return "";
  str = str.toString();
  //如果已经是html格式  直接返回
  if (/<img\b[^>]*>|<audio\b[^>]*>/.test(str)) return str;
  return str.replace(/http:\/\/.*?\.(mp3|jpg|jpeg|png|gif)/ig, function (w) {
    if (/mp3$/i.test(w)) {
      return '<audio src=' + w + ' controls />'
    } else {
      return '<img style=max-width:100%;vertical-align:middle;  src=' + w + ' />'
    }
  }).replace(/\n/g, '<br />').replace(/\\n/g, '<br />')
};

let qiniuURL; //七牛域名
let baseURL; //接口域名
let staticURL; //静态测评接口域名
let qiniuSpaceURL; //七牛空间域名
let  agentUrl;
let lantianUrl; //蓝天域名
let areas;//省市区三级联动
let anlie;
let region; // 存储区域
console.log(location.origin, '233');
// const http = location.origin.indexOf('https') ? 'https' : 'http';
if (location.hostname == 'localhost' || location.protocol == "file:" || /^192\.168\.\d+\.\d+/.test(location.hostname)) {
  //指定本地连接环境 开发
  baseURL = "http://assessmenttest.xinguoren.cn/assessment";
 // baseURL1 = "http://assessmentdev.xinguoren.cn";
  staticURL = "http://statictest.xinguoren.cn/";
  agentUrl = "http://agenttest.e-eduspace.com/webusiness/";
  qiniuURL = "conferencetest.e-eduspace.com/";
  qiniuSpaceURL = "wisdom-conference-test";
  lantianUrl = "http://lantiantest.e-edusky.com/";
  areas = "http://omptest.xinguoren.cn/";//
  region = "http://up-z1.qiniup.com"
  anlie = "http://localhost:8080/#/login"; //5.22新增

  // staticURL="http://staticdev.xinguoren.cn/";
  // lantianUrl = "http://lantiandev.e-edusky.com/";
  // baseURL = 'http://assessmentdev.xinguoren.cn/assessment';
  // areas = "http://ompdev.xinguoren.cn/";
  // qiniuURL = "conferencetest.e-eduspace.com/";
  // qiniuSpaceURL = "wisdom-conference-test";
  // region = "http://up-z1.qiniup.com"

  // anlie = "http://lantiandev.e-edusky.com/org/index.html#/login"  //案列522新增
}else if(location.hostname == 'testingtest.e-eduspace.com'){
  lantianUrl = "http://lantiantest.e-edusky.com/"
  baseURL = 'http://assessmenttest.xinguoren.cn/assessment';
  staticURL = "http://statictest.xinguoren.cn/";
  areas = "http://omptest.xinguoren.cn/";
  qiniuURL = "conferencetest.e-eduspace.com/";
  qiniuSpaceURL = "wisdom-conference-test";
  region = "http://up-z1.qiniup.com"

  anlie = "http://lantiantest.e-edusky.com/org/index.html#/login"  //案列522新增
} else if(location.hostname == 'testingdev.e-eduspace.com'){
  staticURL="http://staticdev.xinguoren.cn/";
  lantianUrl = "http://lantiandev.e-edusky.com/";
  baseURL = 'http://assessmentdev.xinguoren.cn/assessment';
  areas = "http://ompdev.xinguoren.cn/";
  qiniuURL = "conferencetest.e-eduspace.com/";
  qiniuSpaceURL = "wisdom-conference-test";
  region = "http://up-z1.qiniup.com"

  anlie = "http://lantiandev.e-edusky.com/org/index.html#/login"  //案列522新增
}
else if(location.hostname == 'testing.e-eduspace.com'){
  staticURL="http://static.xinguoren.cn/";
  lantianUrl = "http://lantian.e-edusky.com/";
  baseURL = 'http://assessment.xinguoren.cn/assessment';
  areas = "http://omp.xinguoren.cn/";
  qiniuURL = "file.assessment.e-eduspace.com/";
  qiniuSpaceURL = "eeduspace-assessment-file";
  region = "http://up-z2.qiniup.com"

  anlie = "http://lantian.e-edusky.com/org/index.html#/login"  //案列522新增

}
/*
*
*  else if (location.hostname == "lantiandev.e-edusky.com") { //蓝天开发
  lantianUrl = "http://lantiandev.e-edusky.com/"
} else if (location.hostname == "lantiantest.e-edusky.com") { //蓝天测试
  lantianUrl = "http://lantiantest.e-edusky.com/"
} else if (location.hostname == "omptest.xinguoren.cn/") {
  areas = "http://omptest.xinguoren.cn/";
}else if (location.hostname == "ompdev.xinguoren.cn/") {
  areas = "http://ompdev.xinguoren.cn/";
}
*
* */
export {
  baseURL, staticURL, qiniuURL, qiniuSpaceURL, agentUrl, lantianUrl,areas,anlie, region
}

axios.defaults.baseURL = baseURL;
axios.defaults.staticURL = staticURL;
export var $axios = axios;
export var $ajax = {
  //登录
  login(sendData) {
    return axios.post(rootUrl1 + "agency/user/agencyLogin", sendData)
  },
  //获取课表
  getAgencyTask(sendData) {
    return axios.post(rootUrl1 + "agencyTask/getAgencyTask", sendData)
  }
}


export const parseJSON = (str) => {
  try {
    return (eval("(" + str + ")"));
  } catch (e) {
    return str;
  }
};

export var GrandList = {
  '11': '一年级',
  '12': '二年级',
  '13': '三年级',
  '14': '四年级',
  '15': '五年级',
  '16': '六年级',
  '21': '七年级',
  '22': '八年级',
  '23': '九年级',
  '24': '中考',
  '31': '高一',
  '32': '高二',
  '33': '高考',

};


export var commonSubject = {
  '1': '语文',
  '2': '数学',
  '4': '物理',
  '3': '英语',
  '5': '化学',
  '6': '生物',
  '7': '历史',
  '8': '地理',
  '9': '政治',
  '10': '科学',
  '11': '信息技术',
  '12': '品德与生活',
  '13': '品德与社会',
  '14': '思想品德',
  '15': '心理学',
  '16': '习惯趣谈'
};

export var dateConversionMinutes = (str) =>{
  let time = str.substr(0,2),
      minute=str.substr(3,2),
      fen = time * 60 + Number(minute);
  let myDate = new Date();
  return (myDate.getHours() * 60 + myDate.getMinutes()) > fen ? false : true
}
